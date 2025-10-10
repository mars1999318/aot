@echo off
echo 开始替换LOGO文件...

REM 检查新LOGO文件是否存在
if not exist "public\new_logo.png" (
    echo 错误：找不到 new_logo.png 文件
    echo 请将新LOGO图片保存为 public\new_logo.png
    pause
    exit /b 1
)

echo 找到新LOGO文件，开始替换...

REM 备份当前LOGO
copy "public\logo.png" "public\logo_old_backup.png"

REM 替换主LOGO文件
copy "public\new_logo.png" "public\logo.png"

REM 生成不同尺寸的favicon文件
echo 生成favicon文件...

REM 复制到不同尺寸文件（这里使用相同文件，实际应用中应该调整尺寸）
copy "public\logo.png" "public\favicon-16x16.png"
copy "public\logo.png" "public\favicon-32x32.png"
copy "public\logo.png" "public\apple-touch-icon.png"
copy "public\logo.png" "public\android-chrome-192x192.png"
copy "public\logo.png" "public\android-chrome-512x512.png"

REM 生成ICO文件（使用PNG作为ICO）
copy "public\logo.png" "public\favicon.ico"

echo LOGO替换完成！
echo 新LOGO文件已替换到所有位置
pause
