# 部署到GitHub的完整步骤

## 1. 创建GitHub仓库
1. 访问 https://github.com
2. 点击 "New repository"
3. 仓库名称：`AOT01`
4. 选择 Public 或 Private
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

## 2. 推送代码到GitHub
在项目目录中运行以下命令：

```bash
# 添加远程仓库（替换为您的实际仓库URL）
git remote add origin https://github.com/您的用户名/AOT01.git

# 推送代码到GitHub
git push -u origin master
```

## 3. 配置GitHub Pages（可选）
如果您想部署为静态网站：

1. 在GitHub仓库页面，点击 "Settings"
2. 滚动到 "Pages" 部分
3. 在 "Source" 下选择 "Deploy from a branch"
4. 选择 "master" 分支和 "/ (root)" 文件夹
5. 点击 "Save"

## 4. 构建和部署脚本
为了自动部署，您可以添加以下GitHub Actions工作流：

创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/master'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 5. 项目信息
- 项目名称：AOT01
- 技术栈：React + TypeScript + Vite + Tailwind CSS
- 主要功能：Web3应用，包含质押、推荐等功能
- 多语言支持：中文、英文、日文、韩文
