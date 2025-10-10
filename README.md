# AOT01 - DeFi Staking Platform

一个基于区块链技术的去中心化金融质押平台，采用玻璃拟态设计风格，提供质押、推荐、公益等功能。

## ✨ 功能特性

### 🏠 仪表盘
- 实时显示用户质押数据
- 推荐统计和收益概览
- 质押收益率和推荐收益率展示

### 💰 质押功能
- 支持AOT代币质押
- 多档位收益率系统
- 实时质押记录管理
- 质押收益进度追踪

### 👥 推荐系统
- 推荐链接生成和分享
- 推荐人数据统计
- 推荐奖励机制
- 推荐历史记录

### ❤️ 公益功能
- 公益资金池展示
- 捐赠记录管理
- 透明化公益流程

## 🎨 设计特色

### 玻璃拟态设计
- 采用现代化的玻璃拟态(Glassmorphism)设计风格
- 透明背景和模糊效果
- 优雅的视觉层次和交互体验

### 响应式布局
- 完美适配桌面端和移动端
- 流畅的页面切换动画
- 直观的用户界面

### 多语言支持
- 中文简体/繁体
- 英文
- 日文
- 韩文

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **区块链交互**: Wagmi v2 + Viem
- **状态管理**: TanStack Query
- **路由**: React Router v6
- **国际化**: react-i18next

## 🚀 快速开始

### 环境要求
- Node.js 16.0+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📱 页面结构

```
src/
├── components/          # 可复用组件
├── pages/             # 页面组件
├── hooks/             # 自定义Hooks
├── utils/             # 工具函数
├── styles/            # 样式文件
├── i18n/              # 国际化配置
└── types/             # TypeScript类型定义
```

## 🌐 部署

### GitHub Pages
1. 构建项目: `npm run build`
2. 推送到GitHub仓库
3. 在仓库设置中启用GitHub Pages
4. 选择部署分支为 `gh-pages`

### Vercel部署
1. 连接GitHub仓库到Vercel
2. 自动部署配置
3. 环境变量设置

## 🔧 配置

### 合约地址配置
在 `src/constants/contracts.ts` 中配置智能合约地址：

```typescript
export const ARRIVE_ON_TIME_ADDRESS = '0x...' // 质押合约地址
export const AOT_TOKEN_ADDRESS = '0x...'     // 代币合约地址
```

### 网络配置
支持BSC主网，可在 `src/utils/networkUtils.ts` 中配置RPC节点。

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📞 联系方式

如有问题，请通过GitHub Issues联系我们。
