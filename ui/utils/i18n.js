// Internationalization - EN/ZH/PL language support
// Detects browser language, persists choice, translates UI strings

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.hardware': 'Hardware',
    'nav.demo': 'Live Demo',
    'nav.architecture': 'Architecture',
    'nav.performance': 'Performance',
    'nav.applications': 'Applications',
    'nav.sensing': 'Sensing',
    'nav.training': 'Training',
    'nav.poseFusion': 'Pose Fusion',
    'nav.observatory': 'Observatory',

    // Dashboard
    'dashboard.title': 'Revolutionary WiFi-Based Human Pose Detection',
    'dashboard.subtitle': 'Human Tracking Through Walls Using WiFi Signals',
    'dashboard.description': 'AI can track your full-body movement through walls using just WiFi signals. Researchers at Carnegie Mellon have trained a neural network to turn basic WiFi signals into detailed wireframe models of human bodies.',
    'dashboard.status': 'System Status',
    'dashboard.metrics': 'System Metrics',
    'dashboard.features': 'Features',
    'dashboard.liveStats': 'Live Statistics',
    'dashboard.activePersons': 'Active Persons',
    'dashboard.avgConfidence': 'Avg Confidence',
    'dashboard.totalDetections': 'Total Detections',
    'dashboard.zoneOccupancy': 'Zone Occupancy',

    // Status
    'status.apiServer': 'API Server',
    'status.hardware': 'Hardware',
    'status.inference': 'Inference',
    'status.streaming': 'Streaming',
    'status.dataSource': 'Data Source',

    // Metrics
    'metrics.cpu': 'CPU Usage',
    'metrics.memory': 'Memory Usage',
    'metrics.disk': 'Disk Usage',

    // Benefits
    'benefit.throughWalls': 'Through Walls',
    'benefit.throughWallsDesc': 'Works through solid barriers with no line of sight required',
    'benefit.privacy': 'Privacy-Preserving',
    'benefit.privacyDesc': 'No cameras or visual recording - just WiFi signal analysis',
    'benefit.realtime': 'Real-Time',
    'benefit.realtimeDesc': 'Maps 24 body regions in real-time at 100Hz sampling rate',
    'benefit.lowCost': 'Low Cost',
    'benefit.lowCostDesc': 'Built using $30 commercial WiFi hardware',

    // Stats
    'stat.bodyRegions': 'Body Regions',
    'stat.samplingRate': 'Sampling Rate',
    'stat.accuracy': 'Accuracy (AP@50)',
    'stat.hardwareCost': 'Hardware Cost',

    // Actions
    'action.startDetection': 'Start Detection',
    'action.stopDetection': 'Stop Detection',
    'action.toggleTheme': 'Toggle theme',
    'action.exportData': 'Export data',
    'action.screenshot': 'Take screenshot',

    // Connection
    'conn.connected': 'Connected',
    'conn.connecting': 'Connecting...',
    'conn.offline': 'Offline',
    'conn.reconnecting': 'Reconnecting...',
    'conn.live': 'Live',
    'conn.simulated': 'Simulated',

    // Hardware
    'hardware.title': 'Hardware Configuration',
    'hardware.antennaArray': '3×3 Antenna Array',
    'hardware.antennaHelp': 'Click antennas to toggle their state',
    'hardware.transmitters': 'Transmitters (3)',
    'hardware.receivers': 'Receivers (6)',
    'hardware.wifiConfig': 'WiFi Configuration',
    'hardware.frequency': 'Frequency',
    'hardware.subcarriers': 'Subcarriers',
    'hardware.samplingRate': 'Sampling Rate',
    'hardware.totalCost': 'Total Cost',
    'hardware.csiData': 'Real-time CSI Data',

    // Demo
    'demo.title': 'Live Demonstration',
    'demo.startStream': 'Start Stream',
    'demo.stopStream': 'Stop Stream',
    'demo.ready': 'Ready',
    'demo.signalAnalysis': 'WiFi Signal Analysis',
    'demo.signalStrength': 'Signal Strength:',
    'demo.latency': 'Processing Latency:',
    'demo.poseDetection': 'Human Pose Detection',
    'demo.personsDetected': 'Persons Detected:',
    'demo.confidence': 'Confidence:',
    'demo.keypoints': 'Keypoints:',

    // Architecture
    'arch.title': 'System Architecture',
    'arch.csiInput': 'CSI Input',
    'arch.csiInputDesc': 'Channel State Information collected from WiFi antenna array',
    'arch.phaseSanitization': 'Phase Sanitization',
    'arch.phaseSanitizationDesc': 'Remove hardware-specific noise and normalize signal phase',
    'arch.modalityTranslation': 'Modality Translation',
    'arch.modalityTranslationDesc': 'Convert WiFi signals to visual representation using CNN',
    'arch.denseposeRcnn': 'DensePose-RCNN',
    'arch.denseposeRcnnDesc': 'Extract human pose keypoints and body part segmentation',
    'arch.wireframeOutput': 'Wireframe Output',
    'arch.wireframeOutputDesc': 'Generate final human pose wireframe visualization',

    // Performance
    'perf.title': 'Performance Analysis',
    'perf.wifiBased': 'WiFi-based (Same Layout)',
    'perf.avgPrecision': 'Average Precision:',
    'perf.imageBased': 'Image-based (Reference)',
    'perf.advantagesLimitations': 'Advantages & Limitations',
    'perf.advantages': 'Advantages',
    'perf.adv1': 'Through-wall detection',
    'perf.adv2': 'Privacy preserving',
    'perf.adv3': 'Lighting independent',
    'perf.adv4': 'Low cost hardware',
    'perf.adv5': 'Uses existing WiFi',
    'perf.limitations': 'Limitations',
    'perf.lim1': 'Performance drops in different layouts',
    'perf.lim2': 'Requires WiFi-compatible devices',
    'perf.lim3': 'Training requires synchronized data',

    // Applications
    'apps.title': 'Real-World Applications',
    'apps.elderlyCare': 'Elderly Care Monitoring',
    'apps.elderlyCareDesc': 'Non-invasive monitoring for elderly living alone, with fall detection and emergency alerts.',
    'apps.homeSecurity': 'Home Security Systems',
    'apps.homeSecurityDesc': 'Invisible intrusion detection without cameras, preserving privacy while ensuring security.',
    'apps.healthcare': 'Healthcare Patient Monitoring',
    'apps.healthcareDesc': 'Contactless vital sign monitoring for hospital patients and rehabilitation tracking.',
    'apps.smartBuilding': 'Smart Building Occupancy',
    'apps.smartBuildingDesc': 'Energy optimization through real-time occupancy detection in commercial buildings.',
    'apps.arvr': 'AR/VR Applications',
    'apps.arvrDesc': 'Full body tracking for immersive experiences without wearable sensors.',
    'apps.considerations': 'Implementation Considerations',

    // Training
    'training.title': 'Model Training',
    'training.subtitle': 'Record CSI data, train pose estimation models, and manage .rvf files',

    // Sensing
    'sensing.title': 'Live WiFi Sensing',
    'sensing.connection': 'Connection',
    'sensing.signalFeatures': 'Signal Features',
    'sensing.variance': 'Variance',
    'sensing.motionBand': 'Motion Band',
    'sensing.breathingBand': 'Breathing Band',
    'sensing.spectralPower': 'Spectral Power',
    'sensing.classification': 'Classification',
    'sensing.confidence': 'Confidence',
    'sensing.about': 'About This Data',
    'sensing.nodeStatus': 'NODE STATUS',

    // Misc
    'misc.loading': 'Loading...',
    'misc.error': 'An error occurred',
    'misc.noData': 'No data available',
    'misc.close': 'Close',
    'misc.cancel': 'Cancel',
    'misc.confirm': 'Confirm',
    'misc.settings': 'Settings',
    'misc.language': 'Language',
    'misc.never': 'Never',
    'misc.unknown': 'Unknown',
    'misc.on': 'On',
    'misc.off': 'Off',
    'misc.none': 'None',
    'misc.good': 'Good',
    'misc.poor': 'Poor',
    'misc.idle': 'Idle',

    // Connection status widget
    'conn.error': 'Error',
    'conn.reconnect': 'Reconnect',
    'conn.disconnected': 'Disconnected',

    // Sensing tab
    'sensing.loading3d': 'Loading 3D engine...',
    'sensing.renderUnavailable': '3D rendering unavailable',
    'sensing.rssi': 'RSSI',
    'sensing.details': 'Details',
    'sensing.dominantFreq': 'Dominant Freq',
    'sensing.changePoints': 'Change Points',
    'sensing.sampleRate': 'Sample Rate',
    'sensing.noNodes': 'No nodes detected',
    'sensing.node': 'Node',
    'sensing.stale': 'STALE',
    'sensing.active': 'ACTIVE',
    'sensing.absent': 'ABSENT',
    'sensing.aboutText': 'Metrics are computed from WiFi Channel State Information (CSI). With {count} ESP32 node(s) you get presence detection, breathing estimation, and gross motion. Add 3-4+ ESP32 nodes around the room for spatial resolution and limb-level tracking.',
    'sensing.bannerLive': 'LIVE — ESP32 HARDWARE',
    'sensing.bannerSim': 'SIMULATED — NO HARDWARE',
    'sensing.bannerReconnecting': 'RECONNECTING...',
    'sensing.bannerOffline': 'OFFLINE — CLIENT SIMULATION',

    // Dashboard data source
    'dash.dsLive': 'ESP32',
    'dash.dsLiveMsg': 'Real hardware connected',
    'dash.dsSim': 'SIMULATED',
    'dash.dsSimMsg': 'Server running without hardware',
    'dash.dsReconnecting': 'RECONNECTING',
    'dash.dsReconnectingMsg': 'Attempting to connect...',
    'dash.dsOffline': 'OFFLINE',
    'dash.dsOfflineMsg': 'Server unreachable, local fallback',
    'dash.healthy': 'HEALTHY',
    'dash.apiRunning': 'API server is running normally',

    // Live Demo tab
    'demo.detectingSource': 'Detecting data source...',
    'demo.livePoseTitle': 'Live Human Pose Detection',
    'demo.startDetection': 'Start Detection',
    'demo.stopDetection': 'Stop Detection',
    'demo.demoBtn': 'Demo',
    'demo.debugMode': 'Debug Mode',
    'demo.hideDebug': 'Hide Debug',
    'demo.zone': 'Zone',
    'demo.perfMetrics': 'Performance Metrics',
    'demo.connStatus': 'Connection Status:',
    'demo.framesProcessed': 'Frames Processed:',
    'demo.uptime': 'Uptime:',
    'demo.errors': 'Errors:',
    'demo.lastUpdate': 'Last Update:',
    'demo.estimationMode': 'Estimation Mode',
    'demo.waitingFrame': 'Waiting for first frame...',
    'demo.modelControl': 'Model Control',
    'demo.model': 'Model:',
    'demo.signalDerived': 'Signal-Derived (no model)',
    'demo.loraProfile': 'LoRA Profile:',
    'demo.loadModel': 'Load Model',
    'demo.unload': 'Unload',
    'demo.noModelLoaded': 'No model loaded',
    'demo.compare': 'Compare: Signal vs Model',
    'demo.training': 'Training',
    'demo.openTraining': 'Open Training Panel',
    'demo.record60': 'Record 60s',
    'demo.setupGuide': 'Setup Guide',
    'demo.setup1': '1 ESP32 + 1 AP',
    'demo.setup1Desc': 'Presence, breathing, gross motion',
    'demo.setup2': '2-3 ESP32s',
    'demo.setup2Desc': 'Body localization, motion direction',
    'demo.setup3': '4+ ESP32s + trained model',
    'demo.setup3Desc': 'Individual limb tracking, full pose',
    'demo.setupNote': 'Signal-Derived mode uses aggregate CSI features. For per-limb tracking, load a trained .rvf model with --model path.rvf and use 4+ sensors.',
    'demo.systemHealth': 'System Health',
    'demo.apiHealth': 'API Health:',
    'demo.wsHealth': 'WebSocket:',
    'demo.poseService': 'Pose Service:',
    'demo.debugInfo': 'Debug Information',
    'demo.forceReconnect': 'Force Reconnect',
    'demo.clearErrors': 'Clear Errors',
    'demo.exportLogs': 'Export Logs',
    'demo.bannerLive': 'LIVE — ESP32 Hardware Connected',
    'demo.bannerSim': 'SIMULATED DATA — No Hardware Detected',
    'demo.bannerReconnecting': 'RECONNECTING TO SERVER...',
    'demo.bannerOffline': 'OFFLINE — Server Unreachable, Local Sim',
    'demo.statusActiveEsp32': 'Active — ESP32 Live',
    'demo.statusActiveSim': 'Active — Simulated Data',
    'demo.statusActiveOffline': 'Active — Offline Simulation',
    'demo.statusConnecting': 'Connecting...',
    'demo.connEsp32': 'Connected — ESP32',
    'demo.connSim': 'Connected — Simulated',
    'demo.connReconnecting': 'Reconnecting...',
    'demo.connOffline': 'Offline — Simulated',
    'demo.modelInference': 'Model Inference',
    'demo.modelInferenceDesc': 'Pose is estimated by a trained neural network loaded from an RVF container.',
    'demo.signalDerivedBadge': 'Signal-Derived',
    'demo.signalDerivedDesc': 'Keypoints are derived from live CSI signal features (motion power, breathing rate, variance).',
    'demo.recording': 'Recording...',
    'demo.trainingPanel': 'Training Panel',
    'demo.trainingPanelDesc': 'Configure and start model training from here. Connect to the backend training API to manage epochs, datasets, and checkpoints.',
    'demo.trainingStatus': 'Status:',
    'demo.trainingService': 'Training service:',
    'demo.connected': 'Connected',
    'demo.notAvailable': 'Not available',
    'demo.loadingModel': 'Loading...',
    'demo.selectModelFirst': 'Select a model first',

    // Command palette
    'cmd.placeholder': 'Type a command...',
    'cmd.noMatch': 'No matching commands',
    'cmd.navigation': 'Navigation',
    'cmd.actions': 'Actions',
    'cmd.goTo': 'Go to {label}',
    'cmd.openPoseFusion': 'Open Pose Fusion',
    'cmd.openObservatory': 'Open Observatory',
    'cmd.toggleTheme': 'Toggle Dark/Light Theme',
    'cmd.togglePerf': 'Toggle Performance Monitor',
    'cmd.toggleActivity': 'Toggle Activity Log',
    'cmd.exportSensor': 'Export Sensor Data',
    'cmd.toggleFullscreen': 'Toggle Fullscreen',
    'cmd.showShortcuts': 'Show Keyboard Shortcuts',

    // Onboarding
    'onb.welcomeTitle': 'Welcome to RuView',
    'onb.welcomeText': 'WiFi-based human pose estimation that works through walls. Let\'s take a quick tour of the dashboard.',
    'onb.statusTitle': 'System Status',
    'onb.statusText': 'Monitor your WiFi sensing hardware and API server status in real time. Green means everything is connected.',
    'onb.demoTitle': 'Live Demo',
    'onb.demoText': 'Switch to the Live Demo tab to see real-time pose detection. Connect an ESP32 sensor or use the built-in simulation.',
    'onb.sensingTitle': 'Sensing Visualization',
    'onb.sensingText': 'The Sensing tab shows a 3D Gaussian splat visualization of WiFi signal fields, with real-time metrics.',
    'onb.shortcutsTitle': 'Keyboard Shortcuts',
    'onb.shortcutsText': 'Press ? for shortcuts, Ctrl+K for the command palette, or use number keys 1-8 to switch tabs quickly.',
    'onb.doneTitle': 'You\'re all set!',
    'onb.doneText': 'Explore the dashboard, connect hardware, or start the demo. You can replay this tour anytime from the command palette.',
    'onb.skip': 'Skip tour',
    'onb.back': 'Back',
    'onb.next': 'Next',
    'onb.getStarted': 'Get started'
  },

  zh: {
    // Navigation
    'nav.dashboard': '仪表盘',
    'nav.hardware': '硬件',
    'nav.demo': '实时演示',
    'nav.architecture': '系统架构',
    'nav.performance': '性能分析',
    'nav.applications': '应用场景',
    'nav.sensing': 'WiFi 感知',
    'nav.training': '模型训练',
    'nav.poseFusion': '姿态融合',
    'nav.observatory': '观测台',

    // Dashboard
    'dashboard.title': '基于 WiFi 信号的人体姿态检测',
    'dashboard.subtitle': '利用 WiFi 信号穿墙追踪人体',
    'dashboard.description': 'AI 可以仅通过 WiFi 信号追踪穿墙的全身运动。卡内基梅隆大学的研究人员训练了神经网络，将普通 WiFi 信号转化为详细的人体线框模型。',
    'dashboard.status': '系统状态',
    'dashboard.metrics': '系统指标',
    'dashboard.features': '功能特性',
    'dashboard.liveStats': '实时统计',
    'dashboard.activePersons': '活跃人数',
    'dashboard.avgConfidence': '平均置信度',
    'dashboard.totalDetections': '总检测次数',
    'dashboard.zoneOccupancy': '区域占用',

    // Status
    'status.apiServer': 'API 服务器',
    'status.hardware': '硬件设备',
    'status.inference': '推理引擎',
    'status.streaming': '数据流',
    'status.dataSource': '数据源',

    // Metrics
    'metrics.cpu': 'CPU 使用率',
    'metrics.memory': '内存使用率',
    'metrics.disk': '磁盘使用率',

    // Benefits
    'benefit.throughWalls': '穿墙感知',
    'benefit.throughWallsDesc': '可穿透固体障碍物，无需视线接触',
    'benefit.privacy': '隐私保护',
    'benefit.privacyDesc': '无摄像头、无视觉记录，仅分析 WiFi 信号',
    'benefit.realtime': '实时处理',
    'benefit.realtimeDesc': '以 100Hz 采样率实时映射 24 个身体区域',
    'benefit.lowCost': '低成本',
    'benefit.lowCostDesc': '使用 30 美元商用 WiFi 硬件即可搭建',

    // Stats
    'stat.bodyRegions': '身体区域',
    'stat.samplingRate': '采样率',
    'stat.accuracy': '精度 (AP@50)',
    'stat.hardwareCost': '硬件成本',

    // Actions
    'action.startDetection': '开始检测',
    'action.stopDetection': '停止检测',
    'action.toggleTheme': '切换主题',
    'action.exportData': '导出数据',
    'action.screenshot': '截图',

    // Connection
    'conn.connected': '已连接',
    'conn.connecting': '连接中...',
    'conn.offline': '离线',
    'conn.reconnecting': '重连中...',
    'conn.live': '实时',
    'conn.simulated': '模拟数据',

    // Hardware
    'hardware.title': '硬件配置',
    'hardware.antennaArray': '3×3 天线阵列',
    'hardware.antennaHelp': '点击天线切换其状态',
    'hardware.transmitters': '发射器 (3)',
    'hardware.receivers': '接收器 (6)',
    'hardware.wifiConfig': 'WiFi 配置',
    'hardware.frequency': '频率',
    'hardware.subcarriers': '子载波数',
    'hardware.samplingRate': '采样率',
    'hardware.totalCost': '总成本',
    'hardware.csiData': '实时 CSI 数据',

    // Demo
    'demo.title': '实时演示',
    'demo.startStream': '开始数据流',
    'demo.stopStream': '停止数据流',
    'demo.ready': '就绪',
    'demo.signalAnalysis': 'WiFi 信号分析',
    'demo.signalStrength': '信号强度：',
    'demo.latency': '处理延迟：',
    'demo.poseDetection': '人体姿态检测',
    'demo.personsDetected': '检测到人数：',
    'demo.confidence': '置信度：',
    'demo.keypoints': '关键点：',

    // Architecture
    'arch.title': '系统架构',
    'arch.csiInput': 'CSI 输入',
    'arch.csiInputDesc': '从 WiFi 天线阵列采集信道状态信息',
    'arch.phaseSanitization': '相位净化',
    'arch.phaseSanitizationDesc': '去除硬件特定噪声并归一化信号相位',
    'arch.modalityTranslation': '模态转换',
    'arch.modalityTranslationDesc': '使用 CNN 将 WiFi 信号转换为视觉表示',
    'arch.denseposeRcnn': 'DensePose-RCNN',
    'arch.denseposeRcnnDesc': '提取人体姿态关键点和身体部位分割',
    'arch.wireframeOutput': '线框输出',
    'arch.wireframeOutputDesc': '生成最终人体姿态线框可视化',

    // Performance
    'perf.title': '性能分析',
    'perf.wifiBased': '基于 WiFi（相同布局）',
    'perf.avgPrecision': '平均精度：',
    'perf.imageBased': '基于图像（参考）',
    'perf.advantagesLimitations': '优势与局限',
    'perf.advantages': '优势',
    'perf.adv1': '穿墙检测',
    'perf.adv2': '保护隐私',
    'perf.adv3': '不受光照影响',
    'perf.adv4': '低成本硬件',
    'perf.adv5': '利用现有 WiFi',
    'perf.limitations': '局限',
    'perf.lim1': '不同布局下性能下降',
    'perf.lim2': '需要 WiFi 兼容设备',
    'perf.lim3': '训练需要同步数据',

    // Applications
    'apps.title': '实际应用场景',
    'apps.elderlyCare': '老人看护监测',
    'apps.elderlyCareDesc': '对独居老人进行非侵入式监测，具备跌倒检测和紧急告警功能。',
    'apps.homeSecurity': '家庭安防系统',
    'apps.homeSecurityDesc': '无需摄像头的隐形入侵检测，在保障安全的同时保护隐私。',
    'apps.healthcare': '医疗患者监护',
    'apps.healthcareDesc': '对住院患者进行非接触式生命体征监测和康复追踪。',
    'apps.smartBuilding': '智慧建筑 occupancy',
    'apps.smartBuildingDesc': '通过实时占用检测优化商业建筑能耗。',
    'apps.arvr': 'AR/VR 应用',
    'apps.arvrDesc': '无需穿戴传感器即可实现全身追踪的沉浸式体验。',
    'apps.considerations': '实施注意事项',

    // Training
    'training.title': '模型训练',
    'training.subtitle': '录制 CSI 数据、训练姿态估计模型、管理 .rvf 文件',

    // Sensing
    'sensing.title': '实时 WiFi 感知',
    'sensing.connection': '连接状态',
    'sensing.signalFeatures': '信号特征',
    'sensing.variance': '方差',
    'sensing.motionBand': '运动频段',
    'sensing.breathingBand': '呼吸频段',
    'sensing.spectralPower': '频谱功率',
    'sensing.classification': '分类结果',
    'sensing.confidence': '置信度',
    'sensing.about': '关于此数据',
    'sensing.nodeStatus': '节点状态',

    // Misc
    'misc.loading': '加载中...',
    'misc.error': '发生错误',
    'misc.noData': '暂无数据',
    'misc.close': '关闭',
    'misc.cancel': '取消',
    'misc.confirm': '确认',
    'misc.settings': '设置',
    'misc.language': '语言',
    'misc.never': '从未',
    'misc.unknown': '未知',
    'misc.on': '开',
    'misc.off': '关',
    'misc.none': '无',
    'misc.good': '良好',
    'misc.poor': '较差',
    'misc.idle': '空闲',

    // Connection status widget
    'conn.error': '错误',
    'conn.reconnect': '重新连接',
    'conn.disconnected': '已断开',

    // Sensing tab
    'sensing.loading3d': '正在加载 3D 引擎...',
    'sensing.renderUnavailable': '3D 渲染不可用',
    'sensing.rssi': 'RSSI',
    'sensing.details': '详细信息',
    'sensing.dominantFreq': '主频率',
    'sensing.changePoints': '变化点',
    'sensing.sampleRate': '采样率',
    'sensing.noNodes': '未检测到节点',
    'sensing.node': '节点',
    'sensing.stale': '过期',
    'sensing.active': '活跃',
    'sensing.absent': '无人',
    'sensing.aboutText': '指标由 WiFi 信道状态信息 (CSI) 计算得出。使用 {count} 个 ESP32 节点可实现存在检测、呼吸估算和大幅运动检测。在房间周围添加 3-4 个以上 ESP32 节点可获得空间分辨率和肢体级追踪。',
    'sensing.bannerLive': '实时 — ESP32 硬件',
    'sensing.bannerSim': '模拟 — 无硬件',
    'sensing.bannerReconnecting': '重连中...',
    'sensing.bannerOffline': '离线 — 客户端模拟',

    // Dashboard data source
    'dash.dsLive': 'ESP32',
    'dash.dsLiveMsg': '真实硬件已连接',
    'dash.dsSim': '模拟数据',
    'dash.dsSimMsg': '服务器运行中，无硬件',
    'dash.dsReconnecting': '重连中',
    'dash.dsReconnectingMsg': '正在尝试连接...',
    'dash.dsOffline': '离线',
    'dash.dsOfflineMsg': '服务器不可达，本地回退',
    'dash.healthy': '正常',
    'dash.apiRunning': 'API 服务器运行正常',

    // Live Demo tab
    'demo.detectingSource': '正在检测数据源...',
    'demo.livePoseTitle': '实时人体姿态检测',
    'demo.startDetection': '开始检测',
    'demo.stopDetection': '停止检测',
    'demo.demoBtn': '演示',
    'demo.debugMode': '调试模式',
    'demo.hideDebug': '隐藏调试',
    'demo.zone': '区域',
    'demo.perfMetrics': '性能指标',
    'demo.connStatus': '连接状态：',
    'demo.framesProcessed': '已处理帧数：',
    'demo.uptime': '运行时间：',
    'demo.errors': '错误：',
    'demo.lastUpdate': '最后更新：',
    'demo.estimationMode': '估计模式',
    'demo.waitingFrame': '等待第一帧数据...',
    'demo.modelControl': '模型控制',
    'demo.model': '模型：',
    'demo.signalDerived': '信号推导（无模型）',
    'demo.loraProfile': 'LoRA 配置：',
    'demo.loadModel': '加载模型',
    'demo.unload': '卸载',
    'demo.noModelLoaded': '未加载模型',
    'demo.compare': '对比：信号 vs 模型',
    'demo.training': '训练',
    'demo.openTraining': '打开训练面板',
    'demo.record60': '录制 60 秒',
    'demo.setupGuide': '部署指南',
    'demo.setup1': '1 个 ESP32 + 1 个路由器',
    'demo.setup1Desc': '存在检测、呼吸、大幅运动',
    'demo.setup2': '2-3 个 ESP32',
    'demo.setup2Desc': '人体定位、运动方向',
    'demo.setup3': '4+ 个 ESP32 + 训练模型',
    'demo.setup3Desc': '单肢体追踪、完整姿态',
    'demo.setupNote': '信号推导模式使用聚合 CSI 特征。如需肢体级追踪，请加载训练好的 .rvf 模型（使用 --model path.rvf）并使用 4 个以上传感器。',
    'demo.systemHealth': '系统健康',
    'demo.apiHealth': 'API 健康：',
    'demo.wsHealth': 'WebSocket：',
    'demo.poseService': '姿态服务：',
    'demo.debugInfo': '调试信息',
    'demo.forceReconnect': '强制重连',
    'demo.clearErrors': '清除错误',
    'demo.exportLogs': '导出日志',
    'demo.bannerLive': '实时 — ESP32 硬件已连接',
    'demo.bannerSim': '模拟数据 — 未检测到硬件',
    'demo.bannerReconnecting': '正在重连服务器...',
    'demo.bannerOffline': '离线 — 服务器不可达，本地模拟',
    'demo.statusActiveEsp32': '活跃 — ESP32 实时',
    'demo.statusActiveSim': '活跃 — 模拟数据',
    'demo.statusActiveOffline': '活跃 — 离线模拟',
    'demo.statusConnecting': '连接中...',
    'demo.connEsp32': '已连接 — ESP32',
    'demo.connSim': '已连接 — 模拟',
    'demo.connReconnecting': '重连中...',
    'demo.connOffline': '离线 — 模拟',
    'demo.modelInference': '模型推理',
    'demo.modelInferenceDesc': '姿态由从 RVF 容器加载的训练神经网络估算。',
    'demo.signalDerivedBadge': '信号推导',
    'demo.signalDerivedDesc': '关键点从实时 CSI 信号特征（运动功率、呼吸率、方差）推导。',
    'demo.recording': '录制中...',
    'demo.trainingPanel': '训练面板',
    'demo.trainingPanelDesc': '在此配置和启动模型训练。连接后端训练 API 以管理训练轮次、数据集和检查点。',
    'demo.trainingStatus': '状态：',
    'demo.trainingService': '训练服务：',
    'demo.connected': '已连接',
    'demo.notAvailable': '不可用',
    'demo.loadingModel': '加载中...',
    'demo.selectModelFirst': '请先选择模型',

    // Command palette
    'cmd.placeholder': '输入命令...',
    'cmd.noMatch': '无匹配命令',
    'cmd.navigation': '导航',
    'cmd.actions': '操作',
    'cmd.goTo': '前往 {label}',
    'cmd.openPoseFusion': '打开姿态融合',
    'cmd.openObservatory': '打开观测台',
    'cmd.toggleTheme': '切换深色/浅色主题',
    'cmd.togglePerf': '切换性能监视器',
    'cmd.toggleActivity': '切换活动日志',
    'cmd.exportSensor': '导出传感器数据',
    'cmd.toggleFullscreen': '切换全屏',
    'cmd.showShortcuts': '显示快捷键',

    // Onboarding
    'onb.welcomeTitle': '欢迎使用 RuView',
    'onb.welcomeText': '基于 WiFi 的人体姿态估计，可穿墙工作。让我们快速浏览一下仪表盘。',
    'onb.statusTitle': '系统状态',
    'onb.statusText': '实时监控 WiFi 感知硬件和 API 服务器状态。绿色表示一切已连接。',
    'onb.demoTitle': '实时演示',
    'onb.demoText': '切换到实时演示标签页查看实时姿态检测。连接 ESP32 传感器或使用内置模拟。',
    'onb.sensingTitle': '感知可视化',
    'onb.sensingText': '感知标签页展示 WiFi 信号场的 3D 高斯泼溅可视化，附带实时指标。',
    'onb.shortcutsTitle': '键盘快捷键',
    'onb.shortcutsText': '按 ? 查看快捷键，Ctrl+K 打开命令面板，或使用数字键 1-8 快速切换标签页。',
    'onb.doneTitle': '一切就绪！',
    'onb.doneText': '探索仪表盘、连接硬件或启动演示。您可以随时从命令面板重播此导览。',
    'onb.skip': '跳过导览',
    'onb.back': '上一步',
    'onb.next': '下一步',
    'onb.getStarted': '开始使用'
  },

  pl: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.hardware': 'Sprzet',
    'nav.demo': 'Demo na zywo',
    'nav.architecture': 'Architektura',
    'nav.performance': 'Wydajnosc',
    'nav.applications': 'Aplikacje',
    'nav.sensing': 'Czujniki',
    'nav.training': 'Trening',
    'nav.poseFusion': 'Fuzja pozy',
    'nav.observatory': 'Obserwatorium',

    // Dashboard
    'dashboard.title': 'Rewolucyjne wykrywanie pozy czlowieka przez WiFi',
    'dashboard.subtitle': 'Sledzenie ludzi przez sciany za pomoca sygnalow WiFi',
    'dashboard.description': 'AI moze sledzic ruchy calego ciala przez sciany uzywajac jedynie sygnalow WiFi. Badacze z Carnegie Mellon wytrenowali siec neuronowa do zamiany sygnalow WiFi w szczegolowe modele szkieletowe.',
    'dashboard.status': 'Status systemu',
    'dashboard.metrics': 'Metryki systemu',
    'dashboard.features': 'Funkcje',
    'dashboard.liveStats': 'Statystyki na zywo',
    'dashboard.activePersons': 'Aktywne osoby',
    'dashboard.avgConfidence': 'Srednia pewnosc',
    'dashboard.totalDetections': 'Laczne detekcje',
    'dashboard.zoneOccupancy': 'Zajecie stref',

    // Status
    'status.apiServer': 'Serwer API',
    'status.hardware': 'Sprzet',
    'status.inference': 'Wnioskowanie',
    'status.streaming': 'Streaming',
    'status.dataSource': 'Zrodlo danych',

    // Metrics
    'metrics.cpu': 'Uzycie CPU',
    'metrics.memory': 'Uzycie pamieci',
    'metrics.disk': 'Uzycie dysku',

    // Benefits
    'benefit.throughWalls': 'Przez sciany',
    'benefit.throughWallsDesc': 'Dziala przez przeszkody stale bez linii wzroku',
    'benefit.privacy': 'Ochrona prywatnosci',
    'benefit.privacyDesc': 'Brak kamer i nagrywania - tylko analiza sygnalow WiFi',
    'benefit.realtime': 'Czas rzeczywisty',
    'benefit.realtimeDesc': 'Mapuje 24 regiony ciala w czasie rzeczywistym przy 100Hz',
    'benefit.lowCost': 'Niski koszt',
    'benefit.lowCostDesc': 'Zbudowany z komercyjnego sprzetu WiFi za $30',

    // Stats
    'stat.bodyRegions': 'Regiony ciala',
    'stat.samplingRate': 'Czestotliwosc',
    'stat.accuracy': 'Dokladnosc (AP@50)',
    'stat.hardwareCost': 'Koszt sprzetu',

    // Actions
    'action.startDetection': 'Rozpocznij detekcje',
    'action.stopDetection': 'Zatrzymaj detekcje',
    'action.toggleTheme': 'Zmien motyw',
    'action.exportData': 'Eksportuj dane',
    'action.screenshot': 'Zrob zrzut ekranu',

    // Connection
    'conn.connected': 'Polaczono',
    'conn.connecting': 'Laczenie...',
    'conn.offline': 'Offline',
    'conn.reconnecting': 'Ponowne laczenie...',
    'conn.live': 'Na zywo',
    'conn.simulated': 'Symulacja',

    // Misc
    'misc.loading': 'Ladowanie...',
    'misc.error': 'Wystapil blad',
    'misc.noData': 'Brak danych',
    'misc.close': 'Zamknij',
    'misc.cancel': 'Anuluj',
    'misc.confirm': 'Potwierdz',
    'misc.settings': 'Ustawienia',
    'misc.language': 'Jezyk'
  }
};

export class I18n {
  constructor() {
    this.locale = this.getSavedLocale() || this.detectLocale();
    this.listeners = [];
  }

  init() {
    this.createSelector();
    this.applyTranslations();
  }

  detectLocale() {
    const lang = navigator.language?.toLowerCase() || 'en';
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('pl')) return 'pl';
    return 'en';
  }

  getSavedLocale() {
    try { return localStorage.getItem('ruview-locale'); }
    catch { return null; }
  }

  saveLocale(locale) {
    try { localStorage.setItem('ruview-locale', locale); }
    catch { /* noop */ }
  }

  t(key, params) {
    const dict = translations[this.locale] || translations.en;
    let str = dict[key] || translations.en[key] || key;
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, v);
      }
    }
    return str;
  }

  setLocale(locale) {
    if (!translations[locale]) return;
    this.locale = locale;
    this.saveLocale(locale);
    document.documentElement.setAttribute('lang', locale);
    this.applyTranslations();
    this.listeners.forEach(cb => { try { cb(locale); } catch { /* noop */ } });
  }

  onLocaleChange(callback) {
    this.listeners.push(callback);
    return () => {
      const i = this.listeners.indexOf(callback);
      if (i > -1) this.listeners.splice(i, 1);
    };
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', this.t(key));
    });

    const selector = document.getElementById('lang-selector');
    if (selector) selector.value = this.locale;
  }

  createSelector() {
    const wrapper = document.createElement('div');
    wrapper.className = 'lang-selector-wrap';
    const select = document.createElement('select');
    select.id = 'lang-selector';
    select.className = 'lang-selector';
    select.setAttribute('aria-label', 'Language');

    const options = [
      { value: 'en', label: 'EN' },
      { value: 'zh', label: '中文' },
      { value: 'pl', label: 'PL' },
    ];
    options.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.value;
      opt.textContent = o.label;
      select.appendChild(opt);
    });

    select.value = this.locale;
    select.addEventListener('change', () => this.setLocale(select.value));
    wrapper.appendChild(select);

    const headerInfo = document.querySelector('.header-info');
    if (headerInfo) {
      headerInfo.appendChild(wrapper);
    }
  }

  getAvailableLocales() {
    return Object.keys(translations);
  }

  dispose() {
    this.listeners = [];
  }
}

export const i18n = new I18n();
