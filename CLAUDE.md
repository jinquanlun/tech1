# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a React TypeScript technology showcase website for demonstrating dual-core empowerment technologies: HPH nano-crushing dynamic sterilization and PEF ultra-cold pulse electric field preservation.

## Development Commands
```bash
# Navigate to project directory
cd tech-page

# Install dependencies
npm install

# Start development server (http://localhost:5173/)
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Technology Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Native CSS with custom animations
- **Animation System**: Custom character shuffling animation engine

## Project Structure
```
tech-page/
├── src/
│   ├── App.tsx              # Main routing configuration
│   ├── main.tsx             # Application entry point
│   ├── pages/               # Page components
│   │   ├── MainPage.tsx     # Combined home + tech showcase
│   │   ├── HomePage.tsx     # Landing page with animations
│   │   ├── TechShowcasePage.tsx  # Technology display
│   │   ├── CategoryDetailPage.tsx # Category details
│   │   ├── HPHDetailPage.tsx     # HPH technology details
│   │   └── PEFDetailPage.tsx     # PEF technology details
│   ├── utils/               # Animation utilities
│   │   ├── animationLoop.ts      # RAF animation manager
│   │   ├── letterShuffler.ts     # Character animation
│   │   ├── wordShuffler.ts       # Word animation
│   │   └── textShuffler.ts       # Text animation
│   ├── components/          # Reusable components (empty)
│   └── styles/              # CSS files
```

## Architecture
- **Single Page Application**: React Router manages page navigation
- **Animation System**: Custom-built character shuffling engine using requestAnimationFrame
- **Component Structure**: Pages are composed of reusable animation utilities
- **Routing**: Supports tech detail pages (`/tech/hph`, `/tech/pef`) and category details (`/:techType/:categoryId`)

## Key Features
1. **Custom Animation Engine**: Self-developed character shuffling system with RAF optimization
2. **Responsive Design**: Mobile-first approach with clamp() functions for typography
3. **Performance Optimized**: Efficient animation lifecycle management
4. **TypeScript Integration**: Full type safety across animation utilities

## Animation System
The core animation system consists of:
- `animationLoop.ts`: Centralized RAF manager for performance
- `letterShuffler.ts`: Individual character animation with random symbols
- `wordShuffler.ts`: Word-level animation coordination
- `textShuffler.ts`: Text block animation sequencing

Animation lifecycle: Text → Random shuffling → Final reveal with scaling effects.

## Development Notes
- Working directory is `/Users/quan/cursor/techpageV5/tech-page`
- Development server runs on port 5173
- No test framework currently configured
- ESLint configured with React hooks and TypeScript rules
- Vite handles TypeScript compilation and bundling