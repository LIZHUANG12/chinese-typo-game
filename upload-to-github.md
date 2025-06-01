# GitHub APK构建指南

## 步骤1: 创建GitHub仓库

1. 访问 https://github.com 并登录你的账号
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称：`chinese-typo-game`
4. 描述：中文错字挑战游戏 - 50道文学错字题目
5. 选择 "Public" 或 "Private"
6. 点击 "Create repository"

## 步骤2: 上传项目文件

### 方法A: 通过网页界面上传
1. 在新创建的仓库页面，点击 "uploading an existing file"
2. 将以下文件拖拽到页面中：
   - 整个 `client` 文件夹
   - 整个 `server` 文件夹  
   - 整个 `shared` 文件夹
   - 整个 `android` 文件夹
   - 整个 `.github` 文件夹
   - `capacitor.config.ts`
   - `package.json`
   - `tsconfig.json`
   - `tailwind.config.ts`
   - `vite.config.ts`

3. 在提交信息中输入：`初始提交：中文错字挑战游戏`
4. 点击 "Commit changes"

### 方法B: 通过Git命令行
```bash
git init
git add .
git commit -m "初始提交：中文错字挑战游戏"
git branch -M main
git remote add origin https://github.com/你的用户名/chinese-typo-game.git
git push -u origin main
```

## 步骤3: 启动自动构建

1. 上传完成后，GitHub Actions会自动开始构建APK
2. 在仓库页面点击 "Actions" 标签查看构建进度
3. 构建过程大约需要10-15分钟

## 步骤4: 下载APK

### 下载方式1: Artifacts（立即可用）
1. 在 Actions 页面找到完成的构建
2. 点击构建名称进入详情页
3. 在 "Artifacts" 部分下载 `chinese-typo-game-debug`
4. 解压缩得到 APK 文件

### 下载方式2: Releases（正式版本）
1. 构建完成后会自动创建 Release
2. 在仓库主页点击右侧的 "Releases"
3. 下载最新版本的 APK 文件

## 应用信息
- **应用名称**: 中文错字挑战
- **包名**: com.typogame.app
- **版本**: 1.0.x
- **大小**: 约2-5MB
- **系统要求**: Android 5.0+

## 功能特色
- 50道精选中文文学错字题目
- 红楼梦、三国演义、水浒传、西游记经典内容
- 唐诗宋词、现代文学、外国文学翻译
- 完全离线运行，无需网络连接
- 蓝色渐变界面配金币装饰效果
- 积分奖励系统和正确率统计

## 安装说明
1. 下载APK文件到Android设备
2. 在设置中允许"未知来源"安装
3. 点击APK文件进行安装
4. 安装完成后即可开始游戏

构建过程完全自动化，无需任何额外配置。