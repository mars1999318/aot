@echo off
echo ========================================
echo 完整LOGO替换脚本 - 替换所有LOGO文件
echo ========================================
echo.

REM 检查新LOGO文件是否存在
if not exist "public\new_logo.png" (
    echo 错误: 未找到 public\new_logo.png 文件
    echo 请将您的新LOGO图片放在 public\new_logo.png
    pause
    exit /b 1
)

echo 正在备份现有LOGO文件...
if not exist "logo_backup" mkdir logo_backup
copy "public\logo.png" "logo_backup\logo_backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%.png" >nul 2>&1
copy "public\favicon.ico" "logo_backup\favicon_backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%.ico" >nul 2>&1

echo 正在替换所有LOGO文件...

REM 替换主要LOGO文件
copy "public\new_logo.png" "public\logo.png" >nul
copy "public\new_logo.png" "dist\logo.png" >nul
echo ✓ 已替换 logo.png

REM 替换所有图标文件
copy "public\new_logo.png" "public\favicon-16x16.png" >nul
copy "public\new_logo.png" "public\favicon-32x32.png" >nul
copy "public\new_logo.png" "public\android-chrome-192x192.png" >nul
copy "public\new_logo.png" "public\android-chrome-512x512.png" >nul
copy "public\new_logo.png" "public\apple-touch-icon.png" >nul
echo ✓ 已替换所有图标文件

REM 复制到dist目录
copy "public\favicon-16x16.png" "dist\favicon-16x16.png" >nul
copy "public\favicon-32x32.png" "dist\favicon-32x32.png" >nul
copy "public\android-chrome-192x192.png" "dist\android-chrome-192x192.png" >nul
copy "public\android-chrome-512x512.png" "dist\android-chrome-512x512.png" >nul
copy "public\apple-touch-icon.png" "dist\apple-touch-icon.png" >nul
echo ✓ 已复制到dist目录

REM 创建favicon.ico（使用新LOGO）
copy "public\new_logo.png" "public\favicon.ico" >nul
copy "public\favicon.ico" "dist\favicon.ico" >nul
echo ✓ 已替换 favicon.ico

echo.
echo ========================================
echo LOGO替换完成！
echo ========================================
echo.
echo 已替换的文件:
echo ✓ public/logo.png
echo ✓ public/favicon.ico
echo ✓ public/favicon-16x16.png
echo ✓ public/favicon-32x32.png
echo ✓ public/android-chrome-192x192.png
echo ✓ public/android-chrome-512x512.png
echo ✓ public/apple-touch-icon.png
echo ✓ dist/ 目录中的所有对应文件
echo.
echo 备份文件保存在: logo_backup\ 目录
echo.
echo 现在请重新构建项目:
echo npm run build
echo.
pause
