# RuView WiFi 感知项目 — 操作技能手册

## 项目概述

基于 ESP32-S3 WiFi CSI（信道状态信息）信号实现穿墙人体感知，包括存在检测、呼吸估算、运动检测。

---

## 1. 环境准备

### 1.1 安装 ESP-IDF v5.4

```bash
mkdir -p ~/esp && cd ~/esp
git clone --recursive -b v5.4 https://github.com/espressif/esp-idf.git
cd esp-idf
./install.sh esp32s3
source export.sh
```

**常见问题：**
- Python 3.9 + ruamel.yaml 0.18 不兼容：编辑 `tools/check_python_dependencies.py`，在文件开头加 `import sys; sys.exit(0)`
- cmake 4.x 不兼容：`pip3 install "cmake<4"`

### 1.2 克隆项目

```bash
cd ~/code/physiacl_ai
mkdir ruview-wifi-sensing && cd ruview-wifi-sensing
git clone https://github.com/ruvnet/RuView.git
cd RuView
git submodule update --init --depth 1  # 避免下载完整历史
```

---

## 2. 固件编译与烧录

### 2.1 配置 WiFi 凭据

编辑 `firmware/esp32-csi-node/main/wifi_config.h`：

```c
#define WIFI_SSID     "你的WiFi名"
#define WIFI_PASS     "你的WiFi密码"
#define UDP_SERVER_IP "192.168.x.x"   // 运行 server.py 的电脑 IP
#define UDP_SERVER_PORT 5005
```

### 2.2 编译（无屏幕 DevKitC 配置）

```bash
cd firmware/esp32-csi-node
source ~/esp/esp-idf/export.sh
idf.py set-target esp32s3
# 关键：使用 devkitc 配置禁用显示屏，启用 MGMT+DATA 抓包
idf.py -D SDKCONFIG_DEFAULTS="sdkconfig.defaults;sdkconfig.defaults.devkitc" build
```

> **重要**：必须使用 `sdkconfig.defaults.devkitc`，否则 `CONFIG_DISPLAY_ENABLE` 会导致显示屏探测误判，跳过 MGMT+DATA 升级，CSI yield=0pps。

### 2.3 烧录

```bash
idf.py -p /dev/cu.usbmodem* flash monitor
```

正常输出应显示 `CSI yield: 20-36 pps`。

---

## 3. 本地服务器运行

### 3.1 启动 UDP 数据接收器

```bash
python3 scripts/c6-presence-watcher.py &
```

监听 UDP 5005 端口，接收 ESP32 发送的 60 字节 `rv_feature_state` 包，写入 `/tmp/ruview-last-feature.json`。

### 3.2 启动 Web 服务器

```bash
python3 server.py
```

- HTTP UI + REST API：`http://localhost:3000`
- WebSocket 感知流：`ws://localhost:3001/ws/sensing`

### 3.3 验证

```bash
curl http://localhost:3000/health
# {"ok": true, "status": "healthy", "feature_age_s": 0.35}

curl http://localhost:3000/api/v1/sensing/latest
# {"presence": true, "n_persons": 1, "source": "esp32", ...}
```

---

## 4. UI 国际化（完整覆盖）

### 4.1 支持语言

- English (EN)
- 中文 (ZH) — 浏览器语言为中文时自动切换
- Polski (PL)

### 4.2 翻译文件

`ui/utils/i18n.js` — 约 370 个翻译键，**全量覆盖所有 UI 组件**：

| 组件 | 键前缀 | 说明 |
|------|--------|------|
| 导航栏/仪表盘 | `nav.*`, `dashboard.*`, `status.*`, `metrics.*` | 主页面框架 |
| WiFi 感知页 | `sensing.*`, `conn.*` | 3D 可视化、HUD 指标、连接状态 |
| 实时演示页 | `demo.*` | 按钮、指标、模型控制、部署指南 |
| 通知中心 | `notif.*` | 铃铛、面板、时间格式 |
| 快捷设置 | `qs.*` | 显示/监控/账户/API/数据 |
| 硬件页 | `hw.*` | TX/RX/信号质量 |
| 设置面板 | `set.*` | 连接/检测/渲染/颜色/性能/高级/模型/训练 |
| 训练面板 | `train.*` | 录制/配置/进度/完成/错误 |
| 模型面板 | `model.*` | 模型库/加载/卸载/LoRA |
| 命令面板 | `cmd.*` | Ctrl+K 快捷键 |
| 新手引导 | `onb.*` | 首次使用导览 |
| 应用状态 | `app.*` | 连接/错误/初始化消息 |

### 4.3 已国际化的文件清单

```
ui/app.js                        — 应用入口状态消息
ui/utils/i18n.js                 — 翻译核心（EN/ZH/PL）
ui/utils/connection-status.js    — 头部连接状态组件
ui/utils/notification-center.js  — 通知中心
ui/utils/quick-settings.js       — 快捷设置面板
ui/utils/onboarding.js           — 新手引导
ui/utils/command-palette.js      — 命令面板
ui/components/SensingTab.js      — WiFi 感知 3D 页
ui/components/DashboardTab.js    — 仪表盘
ui/components/LiveDemoTab.js     — 实时演示
ui/components/HardwareTab.js     — 硬件状态
ui/components/SettingsPanel.js   — 设置面板
ui/components/TrainingPanel.js   — 训练面板
ui/components/ModelPanel.js      — 模型库
```

### 4.4 添加新翻译

在 `i18n.js` 的 `translations` 对象中为 `en`、`zh`、`pl` 各添加对应键值，然后在组件中使用：

```javascript
import { i18n } from '../utils/i18n.js';

// 简单文本
element.textContent = i18n.t('your.key');

// 带参数插值
i18n.t('sensing.aboutText', { count: '3' });
i18n.t('train.epoch', { current: 5, total: 100, pct: 5 });
i18n.t('model.loadFailed', { msg: error.message });
```

### 4.5 语言切换

- 自动检测：浏览器 `navigator.language` 以 `zh` 开头则中文，`pl` 开头则波兰语
- 手动切换：页面右上角语言选择器（EN/ZH/PL）
- 持久化：`localStorage('ruview-locale')`

---

## 5. 系统架构

```
ESP32-S3 (CSI采集)
    │ UDP 5005 (rv_feature_state, 60字节)
    ▼
c6-presence-watcher.py → /tmp/ruview-last-feature.json
    │
    ▼
server.py
    ├── :3000 HTTP (静态UI + REST API)
    └── :3001 WebSocket (实时感知数据流)
         │
         ▼
    浏览器 UI (自动中文)
```

### 5.1 WebSocket 数据格式（:3001）

UI 的 `SensingTab` 和 `sensing.service.js` 期望**嵌套结构**：

```json
{
  "type": "sensing_update",
  "source": "esp32",
  "features": {
    "mean_rssi": -50,
    "variance": 0.1,
    "motion_band_power": 0.8,
    "breathing_band_power": 0.05,
    "spectral_power": 0.85,
    "dominant_freq_hz": 0.25,
    "change_points": 0
  },
  "classification": {
    "motion_level": "active",
    "presence": true,
    "confidence": 0.92
  },
  "nodes": [{"id": 1, "rssi": -50, "status": "active"}],
  "node_features": [{
    "node_id": 1,
    "rssi_dbm": -50,
    "stale": false,
    "features": {"variance": 0.1},
    "classification": {"motion_level": "active", "confidence": 0.92}
  }]
}
```

> **注意**：`source` 字段决定 UI 数据源标签。`"esp32"` / `"wifi"` / `"live"` → 实时；`"simulated"` → 模拟。

### 5.2 REST API 端点（:3000）

| 端点 | 用途 |
|------|------|
| `GET /health/live` | 存活检查（UI 启动时调用） |
| `GET /health/health` | 完整健康状态（含 `components` + `metrics`） |
| `GET /api/v1/status` | 数据源状态（`source: "esp32"`） |
| `GET /api/v1/sensing/latest` | 最新一帧感知数据 |
| `GET /api/v1/pose/current` | 当前姿态估计 |
| `GET /api/v1/models` | 模型列表 |
| `GET /api/v1/train/status` | 训练状态 |
| `POST /api/v1/ws-ticket` | WebSocket 认证票据（ADR-272） |

### 5.3 /health/health 响应结构

DashboardTab 期望的格式：

```json
{
  "ok": true,
  "status": "healthy",
  "components": {
    "hardware": {"status": "healthy", "message": "ESP32 connected"},
    "pose": {"status": "healthy", "message": "Sensing active"},
    "stream": {"status": "healthy", "message": "WebSocket streaming"}
  },
  "metrics": {
    "system_metrics": {
      "cpu": {"percent": 12.5},
      "memory": {"percent": 34.2},
      "disk": {"percent": 55.0}
    }
  }
}
```

---

## 6. 常用命令速查

| 操作 | 命令 |
|------|------|
| 编译固件 | `idf.py build` |
| 烧录固件 | `idf.py -p /dev/cu.usbmodem* flash` |
| 查看串口 | `idf.py -p /dev/cu.usbmodem* monitor` |
| 启动服务 | `python3 server.py` |
| 启动UDP监听 | `python3 scripts/c6-presence-watcher.py` |
| 杀死端口占用 | `lsof -ti:3000 -ti:3001 \| xargs kill -9` |
| 检查健康 | `curl http://localhost:3000/health/live` |
| 检查数据源 | `curl http://localhost:3000/api/v1/status` |
| JS语法检查 | `node --check ui/app.js` |

---

## 7. 测试与验证流程

### 7.1 端到端验证步骤

```bash
# 1. 启动服务器
python3 server.py &

# 2. 验证 HTTP 存活
curl -s http://localhost:3000/health/live
# 期望: {"status": "ok"}

# 3. 验证健康端点（含 components + metrics）
curl -s http://localhost:3000/health/health | python3 -m json.tool

# 4. 验证数据源状态
curl -s http://localhost:3000/api/v1/status
# 期望: {"source": "esp32", ...}

# 5. 验证 WebSocket 数据格式（Python 脚本）
python3 -c "
import asyncio, json, struct, hashlib, base64, os
async def test():
    r, w = await asyncio.open_connection('127.0.0.1', 3001)
    key = base64.b64encode(os.urandom(16)).decode()
    w.write(f'GET /ws/sensing HTTP/1.1\r\nHost: localhost\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'.encode())
    await w.drain()
    resp = b''
    while b'\r\n\r\n' not in resp: resp += await r.read(4096)
    h = await r.readexactly(2)
    ln = h[1] & 0x7F
    if ln == 126: ln = struct.unpack('>H', await r.readexactly(2))[0]
    data = json.loads((await r.readexactly(ln)).decode())
    assert data['features']['mean_rssi'] is not None
    assert data['classification']['motion_level'] in ('active','present_still','absent')
    assert isinstance(data['node_features'], list)
    print('WebSocket format OK')
    w.close()
asyncio.run(test())
"

# 6. 验证静态文件
curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/index.html
# 期望: 200

# 7. JS 语法检查（所有修改过的文件）
for f in ui/app.js ui/utils/i18n.js ui/utils/notification-center.js \
         ui/utils/quick-settings.js ui/components/HardwareTab.js \
         ui/components/SettingsPanel.js ui/components/TrainingPanel.js \
         ui/components/ModelPanel.js; do
  node --check "$f" || echo "FAIL: $f"
done
```

### 7.2 UI 浏览器验证清单

- [ ] 打开 `http://localhost:3000`，页面正常加载
- [ ] 右上角语言选择器切换 ZH，所有文本变为中文
- [ ] 连接状态显示"实时"（绿色）或"模拟数据"
- [ ] 仪表盘组件状态卡片显示"健康"
- [ ] 感知页 HUD 指标有数值更新（RSSI、方差等）
- [ ] 通知中心铃铛可点击，面板中文显示
- [ ] 快捷设置齿轮图标打开中文面板
- [ ] Ctrl+K 命令面板显示中文命令

---

## 8. 故障排除

| 问题 | 原因 | 解决 |
|------|------|------|
| CSI yield=0pps | 显示屏配置误判 | 使用 `sdkconfig.defaults.devkitc` 重新编译 |
| OFFLINE — Server Unreachable | UI 找不到 API | 确保用 `server.py` 在 3000 端口启动 |
| Backend unavailable | `/health/live` 404 | server.py 已包含该端点 |
| 感知页无数据 | WS 数据格式不匹配 | 确保 server.py 发送嵌套 `features`/`classification` 结构 |
| 仪表盘组件状态空白 | `/health/health` 缺少字段 | 确保响应含 `components` 和 `metrics.system_metrics` |
| 数据源显示"模拟" | `source` 字段值不对 | `/api/v1/status` 应返回 `"source": "esp32"` |
| cmake 卡住 0% | cmake 4.x 不兼容 | `pip3 install "cmake<4"` |
| esp-idf 激活失败 | ruamel.yaml 元数据bug | patch `check_python_dependencies.py` |
| 子模块下载太慢 | 完整 git 历史过大 | `git submodule update --init --depth 1` |
| i18n 键显示为原文 | 组件未导入 i18n | 检查文件顶部 `import { i18n }` 是否存在 |

---

## 9. GitHub 仓库

- Fork: https://github.com/cskeqing/RuView
- 分支: `feat/chinese-i18n-local-server`
- 上游: https://github.com/ruvnet/RuView
- 推送命令: `git push fork main:feat/chinese-i18n-local-server`
