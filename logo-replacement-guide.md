# ArriveOnTime LOGO 替换指南

## 🎯 快速替换方法

### 方法一：使用自动化脚本（推荐）

1. **准备新LOGO文件**
   - 将您的新LOGO图片重命名为 `new_logo.png`
   - 确保文件放在项目根目录（与 `package.json` 同级）

2. **运行自动化脚本**
   ```bash
   # 双击运行
   replace-logo-automated.bat
   ```

3. **重新构建项目**
   ```bash
   npm run build
   ```

### 方法二：手动替换

#### 需要替换的文件：

| 文件路径 | 建议尺寸 | 用途 |
|---------|---------|------|
| `public/logo.png` | 512x512px | 主要LOGO显示 |
| `public/favicon.ico` | 16x16, 32x32, 48x48px | 网站图标 |
| `public/favicon-16x16.png` | 16x16px | 小尺寸图标 |
| `public/favicon-32x32.png` | 32x32px | 标准图标 |
| `public/android-chrome-192x192.png` | 192x192px | Android图标 |
| `public/android-chrome-512x512.png` | 512x512px | Android高分辨率图标 |
| `public/apple-touch-icon.png` | 180x180px | Apple设备图标 |

#### 同时需要更新 `dist/` 目录中的相同文件

## 🛠️ 工具推荐

### 创建不同尺寸图标的工具：

1. **ImageMagick**（推荐）
   - 下载：https://imagemagick.org/script/download.php#windows
   - 安装后可以自动调整图片尺寸

2. **在线工具**
   - https://www.favicon-generator.org/
   - https://realfavicongenerator.net/

3. **Photoshop/GIMP**
   - 手动调整图片尺寸并导出

## 📱 不同设备的图标要求

- **桌面浏览器**: 16x16, 32x32, 48x48px
- **移动端浏览器**: 192x192, 512x512px  
- **Apple设备**: 180x180px
- **Android设备**: 192x192, 512x512px

## 🔄 版本控制

代码中已更新版本号从 `v=3` 到 `v=4`，这有助于：
- 强制浏览器刷新缓存
- 确保新LOGO立即显示
- 避免旧LOGO的缓存问题

## ✅ 验证步骤

1. 替换文件后运行 `npm run build`
2. 启动开发服务器 `npm run dev`
3. 在浏览器中检查：
   - 侧边栏LOGO
   - 移动端导航栏LOGO
   - 浏览器标签页图标
   - 书签图标

## 🚨 注意事项

- 确保新LOGO在不同尺寸下都清晰可见
- 建议使用PNG格式以获得更好的透明度支持
- 替换后清除浏览器缓存
- 备份原始LOGO文件以防需要恢复

## 📞 技术支持

如果遇到问题，请检查：
1. 文件路径是否正确
2. 图片格式是否支持
3. 浏览器缓存是否已清除
4. 项目是否正确重新构建