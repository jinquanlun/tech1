# 技术展示网站 | Tech Showcase Website

[English](#english) | [中文](#中文)

---

## 中文

### 项目简介

这是一个基于 React 18 + TypeScript 的技术展示网站，专门展示双核心技术解决方案：HPH 纳米破碎·动态灭菌技术和 PEF 超冰温·脉冲电场保鲜技术。项目结合了自定义动画系统、3D 图形和粒子效果，为用户提供沉浸式的技术展示体验。

### 核心技术栈

- **前端框架**: React 18 + TypeScript + Vite
- **路由管理**: React Router DOM
- **3D 图形**: Three.js
- **样式方案**: 原生 CSS + CSS 变量
- **动画效果**: Canvas 粒子效果 + WebGL 着色器
- **构建工具**: Vite + ESLint

### 项目特色

#### 🎨 视觉效果
- **3D WebGL 着色器动画**: 使用 Three.js 和 GSAP 实现的动态地形生成
- **Canvas 粒子系统**: 响应式粒子背景效果，支持移动端优化
- **倾斜布局设计**: 使用 CSS `clip-path` 和 `transform: skewX()` 实现的现代化界面

#### 🔧 技术架构
- **模块化组件设计**: 清晰的组件分层和职责分离
- **配置化数据管理**: 技术分类数据独立配置，便于维护
- **响应式设计**: 支持桌面端和移动端的最佳体验
- **TypeScript 类型安全**: 完整的类型定义和类型检查

#### 🚀 性能优化
- **懒加载路由**: 按需加载页面组件
- **粒子系统优化**: 移动端自动降低粒子密度
- **热重载开发**: 快速开发和调试体验

### 项目结构

```
src/
├── components/
│   ├── common/              # 通用组件
│   │   └── ScrollToTop.tsx  # 页面滚动管理
│   └── ui/                  # UI组件
│       └── infinite-hero.tsx # 3D着色器组件
├── config/                  # 配置文件
│   └── techCategories.ts    # 技术分类数据配置
├── pages/                   # 页面组件
│   ├── MainPage.tsx         # 主页面容器
│   ├── HomePage.tsx         # 首页展示
│   ├── TechShowcasePage.tsx # 技术展示页面
│   ├── HPHDetailPage.tsx    # HPH技术详情页
│   └── PEFDetailPage.tsx    # PEF技术详情页
├── styles/
│   ├── globals/             # 全局样式
│   │   └── index.css        # 基础样式定义
│   └── pages/               # 页面样式
│       ├── HomePage.css     # 首页样式
│       ├── TechShowcasePage.css # 技术展示页样式
│       └── DetailPage.css   # 详情页样式
├── App.tsx                  # 应用程序入口
└── main.tsx                 # React应用挂载点
```

### 页面架构

#### 主页面 (MainPage)
- **三段式滚动布局**: HomePage + TechShowcasePage + InfiniteHero
- **智能导航**: 支持页面间状态传递和精确滚动定位

#### 技术展示页 (TechShowcasePage)
- **双技术展示**: HPH 和 PEF 技术的并列展示
- **交互式分类**: 点击分类弹出详细信息
- **视频播放**: 内置视频播放功能
- **粒子背景**: 动态粒子效果增强视觉体验

#### 详情页面
- **独立路由**: `/tech/hph` 和 `/tech/pef`
- **丰富内容**: 详细的技术介绍和应用场景
- **返回导航**: 智能返回上一页功能

### 安装和运行

#### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

#### 安装依赖
```bash
cd tech-page
npm install
```

#### 开发模式
```bash
npm run dev
```
访问: http://localhost:5173

#### 生产构建
```bash
npm run build
```

#### 代码检查
```bash
npm run lint
```

#### 预览构建
```bash
npm run preview
```

### 核心技术

#### 1. 3D 着色器系统
位于 `src/components/ui/infinite-hero.tsx`
- **WebGL 片段着色器**: 实时地形生成和光照效果
- **分形噪声**: 使用 `fbm6` 函数生成自然地形
- **球体几何**: 动态球体与地形的平滑混合
- **发光效果**: 球体周围的实时发光渲染

#### 2. 粒子动画系统
集成在 `TechShowcasePage.tsx` 中
- **Canvas 渲染**: 高性能粒子绘制
- **波浪运动**: 基于正弦波的自然运动模式
- **连接线算法**: 粒子间距离检测和连线绘制
- **响应式优化**: 根据屏幕尺寸调整粒子数量

#### 3. 倾斜布局系统
- **CSS 变量**: `--skew-deg`, `--magic-vh`, `--scroll-time`
- **分屏动画**: 使用 `cubic-bezier` 的平滑过渡
- **Z-index 层次**: 导航 → 内容 → 粒子的合理层级

### 数据配置

技术分类数据位于 `src/config/techCategories.ts`：

```typescript
export interface TechCategory {
  id: number;
  title: string;
  bgColor: string;
  leftBgColor: string;
  rightBg: string;
  description: string;
  details: string;
}
```

### 样式架构

#### CSS 变量系统
```css
:root {
  --skew-deg: 15deg;
  --magic-vh: 100vh;
  --scroll-time: 1s;
}
```

#### 响应式断点
- **桌面端**: > 768px
- **平板端**: 480px - 768px
- **移动端**: < 480px

### 开发指南

#### 添加新的技术分类
1. 编辑 `src/config/techCategories.ts`
2. 在 `hphCategories` 或 `pefCategories` 数组中添加新项目
3. 确保提供完整的类型信息

#### 自定义样式
1. 全局样式: 编辑 `src/styles/globals/index.css`
2. 页面样式: 在 `src/styles/pages/` 中对应文件
3. 遵循现有的 CSS 变量命名规范

#### 性能优化建议
1. **图片优化**: 使用 WebP 格式和适当的压缩
2. **代码分割**: 考虑使用动态导入拆分大型组件
3. **CSS 优化**: 避免不必要的重绘和回流

### 浏览器兼容性

- **Chrome**: >= 88
- **Firefox**: >= 85
- **Safari**: >= 14
- **Edge**: >= 88

### 许可证

本项目采用 MIT 许可证。

---

## English

### Project Overview

A React 18 + TypeScript tech showcase website featuring dual-core technology solutions: HPH nano-crushing dynamic sterilization and PEF ultra-cold pulse electric field preservation. The project combines custom animation systems, 3D graphics, and particle effects to provide an immersive technology showcase experience.

### Tech Stack

- **Frontend Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM
- **3D Graphics**: Three.js
- **Styling**: Native CSS + CSS Variables
- **Animations**: Canvas particle effects + WebGL shaders
- **Build Tools**: Vite + ESLint

### Key Features

#### 🎨 Visual Effects
- **3D WebGL Shader Animations**: Dynamic terrain generation using Three.js and GSAP
- **Canvas Particle System**: Responsive particle background effects with mobile optimization
- **Skewed Layout Design**: Modern interface using CSS `clip-path` and `transform: skewX()`

#### 🔧 Technical Architecture
- **Modular Component Design**: Clear component layering and separation of concerns
- **Configuration-based Data Management**: Independent tech category configuration for easy maintenance
- **Responsive Design**: Optimal experience for both desktop and mobile
- **TypeScript Type Safety**: Complete type definitions and type checking

#### 🚀 Performance Optimization
- **Lazy Route Loading**: On-demand page component loading
- **Particle System Optimization**: Automatic particle density reduction on mobile
- **Hot Reload Development**: Fast development and debugging experience

### Project Structure

```
src/
├── components/
│   ├── common/              # Common components
│   │   └── ScrollToTop.tsx  # Page scroll management
│   └── ui/                  # UI components
│       └── infinite-hero.tsx # 3D shader component
├── config/                  # Configuration files
│   └── techCategories.ts    # Tech category data configuration
├── pages/                   # Page components
│   ├── MainPage.tsx         # Main page container
│   ├── HomePage.tsx         # Homepage display
│   ├── TechShowcasePage.tsx # Technology showcase page
│   ├── HPHDetailPage.tsx    # HPH technology detail page
│   └── PEFDetailPage.tsx    # PEF technology detail page
├── styles/
│   ├── globals/             # Global styles
│   │   └── index.css        # Base style definitions
│   └── pages/               # Page styles
│       ├── HomePage.css     # Homepage styles
│       ├── TechShowcasePage.css # Tech showcase page styles
│       └── DetailPage.css   # Detail page styles
├── App.tsx                  # Application entry point
└── main.tsx                 # React app mount point
```

### Page Architecture

#### Main Page (MainPage)
- **Three-section Scrollable Layout**: HomePage + TechShowcasePage + InfiniteHero
- **Smart Navigation**: Supports state transfer between pages and precise scroll positioning

#### Tech Showcase Page (TechShowcasePage)
- **Dual Technology Display**: Side-by-side display of HPH and PEF technologies
- **Interactive Categories**: Click categories to show detailed information
- **Video Playback**: Built-in video playback functionality
- **Particle Background**: Dynamic particle effects for enhanced visual experience

#### Detail Pages
- **Independent Routes**: `/tech/hph` and `/tech/pef`
- **Rich Content**: Detailed technical introductions and application scenarios
- **Return Navigation**: Smart back-to-previous-page functionality

### Installation and Setup

#### Requirements
- Node.js >= 16.0.0
- npm >= 8.0.0

#### Install Dependencies
```bash
cd tech-page
npm install
```

#### Development Mode
```bash
npm run dev
```
Visit: http://localhost:5173

#### Production Build
```bash
npm run build
```

#### Code Linting
```bash
npm run lint
```

#### Preview Build
```bash
npm run preview
```

### Core Technologies

#### 1. 3D Shader System
Located in `src/components/ui/infinite-hero.tsx`
- **WebGL Fragment Shaders**: Real-time terrain generation and lighting effects
- **Fractal Noise**: Natural terrain generation using `fbm6` function
- **Sphere Geometry**: Dynamic sphere and terrain smooth blending
- **Glow Effects**: Real-time glow rendering around spheres

#### 2. Particle Animation System
Integrated in `TechShowcasePage.tsx`
- **Canvas Rendering**: High-performance particle drawing
- **Wave Motion**: Natural movement patterns based on sine waves
- **Connection Line Algorithm**: Distance detection and line drawing between particles
- **Responsive Optimization**: Adjust particle count based on screen size

#### 3. Skewed Layout System
- **CSS Variables**: `--skew-deg`, `--magic-vh`, `--scroll-time`
- **Split Screen Animations**: Smooth transitions using `cubic-bezier`
- **Z-index Hierarchy**: Navigation → Content → Particles layering

### Data Configuration

Tech category data is located in `src/config/techCategories.ts`:

```typescript
export interface TechCategory {
  id: number;
  title: string;
  bgColor: string;
  leftBgColor: string;
  rightBg: string;
  description: string;
  details: string;
}
```

### Style Architecture

#### CSS Variable System
```css
:root {
  --skew-deg: 15deg;
  --magic-vh: 100vh;
  --scroll-time: 1s;
}
```

#### Responsive Breakpoints
- **Desktop**: > 768px
- **Tablet**: 480px - 768px
- **Mobile**: < 480px

### Development Guide

#### Adding New Tech Categories
1. Edit `src/config/techCategories.ts`
2. Add new items to `hphCategories` or `pefCategories` arrays
3. Ensure complete type information is provided

#### Custom Styling
1. Global styles: Edit `src/styles/globals/index.css`
2. Page styles: Corresponding files in `src/styles/pages/`
3. Follow existing CSS variable naming conventions

#### Performance Optimization Tips
1. **Image Optimization**: Use WebP format and appropriate compression
2. **Code Splitting**: Consider using dynamic imports for large components
3. **CSS Optimization**: Avoid unnecessary repaints and reflows

### Browser Compatibility

- **Chrome**: >= 88
- **Firefox**: >= 85
- **Safari**: >= 14
- **Edge**: >= 88

### License

This project is licensed under the MIT License.

---

## Development Notes

### Project History
- **Initial Setup**: React 18 + TypeScript + Vite configuration
- **Structure Optimization**: Modular component architecture implementation
- **Performance Tuning**: Code cleanup and optimization (removed 1342+ lines of unused code)
- **Data Extraction**: Separated configuration data for better maintainability

### Recent Optimizations
- Organized directory structure with semantic categorization
- Extracted 128 lines of tech category data into independent configuration
- Optimized CSS file organization by functionality
- Cleaned up empty directories and unused components
- Reduced TechShowcasePage from 663 to 540 lines (-18.5%)

### Future Enhancements
- [ ] Implement lazy loading for detail pages
- [ ] Add service worker for offline support
- [ ] Enhance mobile gesture interactions
- [ ] Add internationalization (i18n) support
- [ ] Implement progressive image loading

---

For any questions or contributions, please refer to the project documentation or contact the development team.