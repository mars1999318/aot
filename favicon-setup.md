# Favicon设置说明

## 需要创建的文件

您需要基于现有的 `public/logo.png` 创建以下文件：

### 1. 基本favicon文件
- `public/favicon.ico` (16x16, 32x32, 48x48 多尺寸ICO文件)
- `public/favicon-16x16.png` (16x16像素)
- `public/favicon-32x32.png` (32x32像素)

### 2. Apple设备支持
- `public/apple-touch-icon.png` (180x180像素)

### 3. Android设备支持
- `public/android-chrome-192x192.png` (192x192像素)
- `public/android-chrome-512x512.png` (512x512像素)

## 创建方法

### 方法1：在线工具（推荐）
1. 访问 https://realfavicongenerator.net/
2. 上传您的 `logo.png` 文件
3. 选择需要的平台和尺寸
4. 下载生成的favicon包
5. 将文件复制到 `public/` 目录

### 方法2：使用图片编辑软件
1. 使用Photoshop、GIMP或在线图片编辑器
2. 将logo.png调整为不同尺寸：
   - 16x16, 32x32, 48x48 (favicon.ico)
   - 180x180 (apple-touch-icon.png)
   - 192x192, 512x512 (Android支持)
3. 保存为对应文件名

### 方法3：使用命令行工具（如果有ImageMagick）
```bash
# 安装ImageMagick后运行
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png
```

## 文件结构
```
public/
├── logo.png (现有)
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
└── site.webmanifest (已创建)
```

## 注意事项
1. 所有favicon文件都应该基于您的logo设计
2. 建议使用PNG格式以获得更好的质量
3. 确保图标在小尺寸下仍然清晰可辨
4. 文件路径使用 `/aot/` 前缀以匹配GitHub Pages部署

## 测试方法
1. 创建文件后，重新构建并部署
2. 在浏览器中访问网站
3. 检查浏览器标签页是否显示图标
4. 在移动设备上测试添加到主屏幕功能
