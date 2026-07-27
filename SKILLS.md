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

## 4. UI 国际化

### 4.1 支持语言

- English (EN)
- 中文 (ZH) — 浏览器语言为中文时自动切换
- Polski (PL)

### 4.2 翻译文件

`ui/utils/i18n.js` — 约 200 个翻译键，覆盖：
- 导航栏、仪表盘、硬件配置
- WiFi 感知页（连接状态、信号特征、分类结果）
- 实时演示页（按钮、指标、模型控制、部署指南）
- 命令面板、新手引导

### 4.3 添加新翻译

在 `i18n.js` 的 `translations` 对象中为 `en`、`zh`、`pl` 各添加对应键值，然后在组件中使用：

```javascript
import { i18n } from '../utils/i18n.js';
element.textContent = i18n.t('your.key');
// 带参数：
i18n.t('sensing.aboutText', { count: '3' });
```

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

---

## 6. 常用命令速查

| 操作 | 命令 |
|------|------|
| 编译固件 | `idf.py build` |
| 烧录固件 | `idf.py -p /dev/cu.usbmodem* flash` |
| 查看串口 | `idf.py -p /dev/cu.usbmodem* monitor` |
| 启动服务 | `python3 server.py` |
| 启动UDP监听 | `python3 scripts/c6-presence-watcher.py` |
| 杀死端口占用 | `lsof -ti:3000 \| xargs kill -9` |
| 检查健康 | `curl http://localhost:3000/health` |

---

## 7. 故障排除

| 问题 | 原因 | 解决 |
|------|------|------|
| CSI yield=0pps | 显示屏配置误判 | 使用 `sdkconfig.defaults.devkitc` 重新编译 |
| OFFLINE — Server Unreachable | UI 找不到 API | 确保用 `server.py` 在 3000 端口启动 |
| Backend unavailable | `/health/live` 404 | server.py 已包含该端点 |
| cmake 卡住 0% | cmake 4.x 不兼容 | `pip3 install "cmake<4"` |
| esp-idf 激活失败 | ruamel.yaml 元数据bug | patch `check_python_dependencies.py` |
| 子模块下载太慢 | 完整 git 历史过大 | `git submodule update --init --depth 1` |

---

## 8. GitHub 仓库

- Fork: https://github.com/cskeqing/RuView
- 分支: `feat/chinese-i18n-local-server`
- 上游: https://github.com/ruvnet/RuView
