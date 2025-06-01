# 中文错字挑战游戏

一款专注于中国文学的错字识别游戏，包含50道精选的古典文学、现代文学和诗歌题目。

## 功能特色

- **50道高质量题目** - 涵盖红楼梦、三国演义、水浒传、西游记等经典作品
- **文学内容丰富** - 包含唐诗宋词、现代文学、外国文学翻译等内容
- **智能错字检测** - 动态识别错字位置，避免简单标点符号错误
- **完全离线运行** - 无需网络连接，数据本地存储
- **移动端优化** - 蓝色渐变界面配金币装饰效果
- **积分奖励系统** - 完整的得分统计和正确率计算

## 题目示例

1. **红楼梦**: "两人从小青梅竹马感情深后" → "两人从小青梅竹马感情深**厚**"
2. **三国演义**: "手持青龙偃月刀威振天下" → "手持青龙偃月刀威**震**天下"
3. **李白诗歌**: "展现了诗先的浪漫情怀" → "展现了诗**仙**的浪漫情怀"

## 技术架构

- **前端**: React + TypeScript + Tailwind CSS
- **移动端**: Capacitor (支持Android/iOS)
- **数据存储**: 本地localStorage
- **构建工具**: Vite + Gradle
- **自动构建**: GitHub Actions

## 快速开始

### 获取APK

1. 查看 [Releases](../../releases) 页面下载最新版本APK
2. 或在 [Actions](../../actions) 页面下载构建产物

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 同步到Android
npx cap sync android

# 构建APK
cd android
./gradlew assembleDebug
```

### 安装要求

- **Android**: 5.0+ (API level 21+)
- **大小**: 约2-5MB
- **权限**: 无特殊权限要求

## 安装说明

1. 下载APK文件到Android设备
2. 在设置中允许"未知来源"应用安装
3. 点击APK文件进行安装
4. 安装完成后即可开始游戏

## 自动构建

每次推送代码到main分支时，GitHub Actions会自动：

1. 构建React应用
2. 配置Android项目
3. 编译生成APK
4. 创建Release并上传APK文件

构建过程大约需要10-15分钟，完全自动化无需人工干预。

## 项目结构

```
├── client/                 # React前端应用
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── data/          # 题目数据
│   │   ├── pages/         # 页面组件
│   │   └── hooks/         # 自定义Hook
├── android/               # Android项目
├── .github/workflows/     # GitHub Actions配置
├── capacitor.config.ts    # Capacitor配置
└── package.json          # 项目依赖
```

## 开发说明

游戏使用动态错字检测算法，通过`findTypoIndex`函数准确定位文本中的错字位置，确保用户点击识别的准确性。所有题目都经过精心筛选，避免了常见的"的地得"等虚词错误，专注于实词挑战。

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件
更新时间：2025年6月1日
