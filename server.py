#!/usr/bin/env python3
"""RuView combined server: UI + REST API (port 3000) + WebSocket sensing (port 3001)."""
import asyncio
import http.server
import json
import os
import socketserver
import struct
import threading
import time
import zlib
from urllib.parse import urlparse, parse_qs

UI_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ui")
FEATURE_FILE = os.environ.get("RUVIEW_FEATURE_JSON", "/tmp/ruview-last-feature.json")
STALENESS_S = 30.0
HTTP_PORT = int(os.environ.get("PORT", "3000"))
WS_PORT = int(os.environ.get("WS_PORT", "3001"))

latest_feature = None
feature_lock = threading.Lock()


def load_feature():
    global latest_feature
    try:
        with open(FEATURE_FILE, "r") as fh:
            d = json.load(fh)
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        return None
    if not isinstance(d, dict):
        return None
    age = time.time() - float(d.get("ts", 0))
    if age > STALENESS_S:
        return None
    with feature_lock:
        latest_feature = d
    return d


def get_feature():
    with feature_lock:
        return latest_feature


# --- HTTP Server ---

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=UI_DIR, **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path == "/health" or path == "/health/health":
            f = load_feature()
            self._json(200, {
                "ok": True, "status": "healthy",
                "feature_age_s": (None if f is None else round(time.time() - f["ts"], 2)),
                "uptime_s": round(time.time() - START_TIME, 1),
            })
            return

        if path in ("/health/live", "/health/ready"):
            self._json(200, {"status": "ok"})
            return

        if path == "/health/metrics":
            f = load_feature()
            self._json(200, {
                "cpu_percent": 12.5, "memory_percent": 34.2, "disk_percent": 55.0,
                "active_connections": 1, "frames_processed": 0,
                "data_source": "esp32" if f else "idle",
            })
            return

        if path == "/health/version":
            self._json(200, {"version": "0.7.0", "build": "local", "idf": "v5.4"})
            return

        if path == "/api/v1/info":
            self._json(200, {
                "name": "RuView WiFi Sensing", "version": "0.7.0",
                "environment": "local", "hardware": "ESP32-S3",
            })
            return

        if path == "/api/v1/status":
            f = load_feature()
            self._json(200, {
                "status": "running", "hardware": "esp32s3",
                "data_source": "esp32" if f else "idle",
                "source": "esp32" if f else "simulated",
            })
            return

        if path == "/api/v1/sensing/latest":
            f = load_feature()
            self._json(200, self._sensing_payload(f))
            return

        if path == "/api/v1/pose/current":
            f = load_feature()
            self._json(200, {
                "persons": [{"id": 1, "confidence": f.get("confidence", 0) if f else 0,
                             "keypoints": []}] if f and f.get("presence") else [],
                "timestamp": int(time.time() * 1000),
            })
            return

        if path == "/api/v1/pose/stats":
            self._json(200, {"total_detections": 0, "avg_confidence": 0, "zones": {}})
            return

        if path == "/api/v1/pose/zones/summary":
            self._json(200, {"zones": []})
            return

        if path == "/api/v1/pose/activities":
            self._json(200, {"activities": []})
            return

        if path == "/api/v1/pose/calibration/status":
            self._json(200, {"calibrated": False, "status": "not_started"})
            return

        if path == "/api/v1/stream/status":
            self._json(200, {"streaming": False, "clients": 0})
            return

        if path == "/api/v1/stream/clients":
            self._json(200, {"clients": []})
            return

        if path == "/api/v1/stream/metrics":
            self._json(200, {"frames_sent": 0, "bytes_sent": 0, "avg_fps": 0})
            return

        if path == "/api/v1/models" or path == "/api/v1/models/active":
            self._json(200, {"models": [], "active": None})
            return

        if path == "/api/v1/models/lora/profiles":
            self._json(200, {"profiles": []})
            return

        if path == "/api/v1/train/status":
            self._json(200, {"status": "idle", "progress": 0})
            return

        if path == "/api/v1/recording/list":
            self._json(200, {"recordings": []})
            return

        if path == "/oauth/status":
            self._json(200, {"enabled": False, "signed_in": False})
            return

        if path.startswith("/api/"):
            self._json(200, {"status": "ok"})
            return

        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path
        content_len = int(self.headers.get("Content-Length", 0))
        if content_len:
            self.rfile.read(content_len)

        if path == "/api/v1/ws-ticket":
            self._json(200, {"ticket": "local-dev-ticket"})
            return

        if path.startswith("/api/"):
            self._json(200, {"status": "ok"})
            return

        self._json(404, {"error": "not found"})

    def do_DELETE(self):
        content_len = int(self.headers.get("Content-Length", 0))
        if content_len:
            self.rfile.read(content_len)
        self._json(200, {"status": "ok"})

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()

    def _sensing_payload(self, f):
        if f is None:
            return {
                "schema_version": 2, "node_id": "1",
                "timestamp_ms": int(time.time() * 1000),
                "presence": False, "n_persons": 0, "confidence": 0.0,
                "motion": 0.0, "breathing_rate_bpm": None, "heartrate_bpm": None,
                "privacy_class": 2, "source": "waiting_for_data",
            }
        return {
            "schema_version": 2, "node_id": f.get("node_id", "1"),
            "timestamp_ms": f.get("timestamp_ms", int(time.time() * 1000)),
            "presence": f.get("presence", False),
            "n_persons": f.get("n_persons", 0),
            "confidence": f.get("confidence", 0.0),
            "motion": f.get("motion", 0.0),
            "breathing_rate_bpm": f.get("breathing_rate_bpm"),
            "heartrate_bpm": f.get("heartrate_bpm"),
            "privacy_class": f.get("privacy_class", 2),
            "source": "esp32",
        }

    def _json(self, code, body):
        payload = json.dumps(body).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, fmt, *args):
        pass


# --- WebSocket Sensing Server (port 3001) ---

async def ws_handler(reader, writer):
    """Minimal WebSocket server that streams sensing data."""
    try:
        data = await asyncio.wait_for(reader.read(4096), timeout=5.0)
    except (asyncio.TimeoutError, ConnectionError):
        writer.close()
        return

    request = data.decode("utf-8", errors="replace")
    if "Upgrade: websocket" not in request:
        writer.close()
        return

    import hashlib
    import base64
    key = ""
    for line in request.split("\r\n"):
        if line.lower().startswith("sec-websocket-key:"):
            key = line.split(":", 1)[1].strip()
            break

    if not key:
        writer.close()
        return

    MAGIC = "258EAFA5-E914-47DA-95CA-5AB5DC11BE65"
    accept = base64.b64encode(
        hashlib.sha1((key + MAGIC).encode()).digest()
    ).decode()

    response = (
        "HTTP/1.1 101 Switching Protocols\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        f"Sec-WebSocket-Accept: {accept}\r\n\r\n"
    )
    writer.write(response.encode())
    await writer.drain()

    try:
        while True:
            f = load_feature()
            if f:
                msg = json.dumps({
                    "type": "sensing",
                    "source": "esp32",
                    "node_id": f.get("node_id", "1"),
                    "timestamp_ms": int(time.time() * 1000),
                    "presence": f.get("presence", False),
                    "n_persons": f.get("n_persons", 0),
                    "confidence": f.get("confidence", 0.0),
                    "motion": f.get("motion", 0.0),
                    "presence_score": f.get("presence_score", 0.0),
                    "breathing_rate_bpm": f.get("breathing_rate_bpm"),
                    "heartrate_bpm": f.get("heartrate_bpm"),
                    "rssi": -50,
                    "variance": f.get("motion", 0.0) * 0.1,
                    "motion_band": f.get("motion", 0.0),
                    "breathing_band": 0.0,
                    "spectral_power": 0.0,
                    "classification": "PRESENT" if f.get("presence") else "ABSENT",
                    "nodes": [{"id": 1, "rssi": -50, "status": "active",
                               "dominant_freq": 0.25, "change_points": 0,
                               "sample_rate": 5}],
                })
            else:
                msg = json.dumps({
                    "type": "sensing", "source": "simulated",
                    "timestamp_ms": int(time.time() * 1000),
                    "presence": False, "n_persons": 0, "confidence": 0.0,
                    "motion": 0.0, "rssi": -60, "variance": 0.0,
                    "classification": "ABSENT", "nodes": [],
                })

            frame = self_encode_ws_frame(msg.encode())
            writer.write(frame)
            await writer.drain()
            await asyncio.sleep(0.5)
    except (ConnectionError, BrokenPipeError, asyncio.CancelledError):
        pass
    finally:
        writer.close()


def self_encode_ws_frame(data: bytes) -> bytes:
    length = len(data)
    if length < 126:
        header = struct.pack("!BB", 0x81, length)
    elif length < 65536:
        header = struct.pack("!BBH", 0x81, 126, length)
    else:
        header = struct.pack("!BBQ", 0x81, 127, length)
    return header + data


async def start_ws_server():
    server = await asyncio.start_server(ws_handler, "0.0.0.0", WS_PORT)
    print(f"[ruview] WebSocket sensing server on ws://localhost:{WS_PORT}/ws/sensing")
    async with server:
        await server.serve_forever()


# --- Main ---

START_TIME = time.time()

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True

    ws_thread = threading.Thread(target=lambda: asyncio.run(start_ws_server()), daemon=True)
    ws_thread.start()

    with socketserver.TCPServer(("0.0.0.0", HTTP_PORT), Handler) as httpd:
        print(f"[ruview] UI + API server on http://localhost:{HTTP_PORT}")
        print(f"[ruview] Feature source: {FEATURE_FILE}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
