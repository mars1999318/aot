# LOGO替换指南

## 步骤1：替换主LOGO文件
请将您的新LOGO图片保存为 `public/logo.png`，覆盖现有文件。

## 步骤2：生成不同尺寸的favicon文件
由于新LOGO是立体徽章设计，建议生成以下尺寸的文件：

### 必需文件：
1. `public/favicon.ico` - 16x16, 32x32, 48x48 多尺寸ICO文件
2. `public/favicon-16x16.png` - 16x16像素PNG
3. `public/favicon-32x32.png` - 32x32像素PNG
4. `public/apple-touch-icon.png` - 180x180像素PNG

### 推荐工具：
- **在线工具**: https://favicon.io/favicon-converter/
- **Photoshop/GIMP**: 手动调整尺寸
- **在线favicon生成器**: https://realfavicongenerator.net/

### 生成步骤：
1. 上传您的新LOGO图片
2. 生成以下尺寸：
   - 16x16 (favicon-16x16.png)
   - 32x32 (favicon-32x32.png) 
   - 180x180 (apple-touch-icon.png)
   - 多尺寸ICO文件 (favicon.ico)

3. 下载生成的文件并替换 `public/` 目录中的对应文件

## 步骤3：验证替换
替换完成后，运行以下命令验证：
```bash
git add .
git commit -m "Update: Replace logo with new design"
git push origin master
```

## 注意事项：
- 新LOGO是立体徽章设计，建议保持高分辨率
- 确保所有尺寸的LOGO都清晰可见
- 测试在不同设备上的显示效果
- 清除浏览器缓存以确保新LOGO显示
