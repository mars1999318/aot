# 手动LOGO替换指南

## 🎯 目标
将现有的LOGO替换为您的新立体徽章设计LOGO

## 📁 需要替换的文件
以下文件都需要替换为新的LOGO图片：

### 主要文件：
- `public/logo.png` - 主LOGO文件
- `public/favicon.ico` - 浏览器标签页图标
- `public/favicon-16x16.png` - 16x16像素图标
- `public/favicon-32x32.png` - 32x32像素图标
- `public/apple-touch-icon.png` - 苹果设备图标
- `public/android-chrome-192x192.png` - Android设备图标
- `public/android-chrome-512x512.png` - Android设备图标

## 🔧 替换步骤

### 方法1：使用自动脚本（推荐）
1. 将新LOGO图片保存为 `public/new_logo.png`
2. 双击运行 `replace-logo.bat`
3. 等待脚本完成

### 方法2：手动替换
1. 将新LOGO图片复制到 `public/` 目录
2. 重命名或覆盖以下文件：
   - `logo.png` ← 新LOGO图片
   - `favicon.ico` ← 新LOGO图片
   - `favicon-16x16.png` ← 新LOGO图片
   - `favicon-32x32.png` ← 新LOGO图片
   - `apple-touch-icon.png` ← 新LOGO图片
   - `android-chrome-192x192.png` ← 新LOGO图片
   - `android-chrome-512x512.png` ← 新LOGO图片

## ✅ 验证替换
替换完成后，运行以下命令验证：
```bash
git add .
git commit -m "Update: Replace logo with new design"
git push origin master
```

## 🎨 新LOGO特点
- 立体徽章设计
- 红色心形 + 蓝色缎带
- 金色月桂花环
- 现代3D风格
- 高对比度设计

## 📱 显示位置
新LOGO将在以下位置显示：
- 浏览器标签页（favicon）
- 桌面端导航栏
- 移动端导航栏
- 手机主屏幕图标
