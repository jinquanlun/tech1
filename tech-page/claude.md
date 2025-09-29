# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Development commands:
```bash
npm run dev     # Start development server (http://localhost:5173)
npm run build   # Build for production (runs TypeScript check + Vite build)
npm run lint    # Run ESLint with TypeScript rules
npm run preview # Preview production build locally
```

## Architecture Overview

This is a React 18 + TypeScript tech showcase website featuring dual-core technology solutions (HPH nano-crushing dynamic sterilization and PEF ultra-cold pulse electric field preservation). The project combines custom animation systems, 3D graphics, and particle effects.

### Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Routing**: React Router DOM
- **Animation**: Custom character shuffling engine + GSAP + Canvas particle effects
- **3D Graphics**: Three.js with React Three Fiber
- **Styling**: Native CSS with custom variables and animations
- **Additional**: TailwindCSS (configured but minimal usage)

### Key Components Architecture

**MainPage Structure**: Three-section scrollable layout
- **HomePage**: Custom character shuffling animations with mathematical symbol decorations
- **TechShowcasePage**: Skewed split-screen layouts with Canvas particle background effects
- **InfiniteHero**: 3D WebGL shader animations using Three.js and GSAP

**Animation Systems**:
1. **Text Shuffling Engine**:
   - `TextShuffler`: Orchestrates multi-line text animations
   - `WordShuffler`: Handles individual word/line shuffling effects
   - `LetterShuffler`: Manages character-level animations with random symbols
   - `AnimationLoop`: RAF-based animation timing management

2. **Particle Animation System**: Canvas-based particle effects in TechShowcasePage
   - Dynamic particle generation and movement
   - Distance-based connection lines between particles
   - Wave-based motion patterns with optimized performance
   - Mobile-responsive particle counts

3. **3D Shader System**: WebGL fragment/vertex shaders in InfiniteHero component
   - GLSL shader effects with time-based animations
   - GSAP timeline integration for shader uniform controls

### Navigation & State Management

**TechShowcasePage State Architecture**:
- `currentPage`: Controls HPH (page 1) vs PEF (page 2) display
- `selectedCategory`: Tracks active category for detail overlay
- `showCategoryContent`: Toggles between main pages and category details
- `showMainPages`: Controls main page visibility
- `focusedSection`: Manages navigation context ('hph' or 'pef')

**Navigation Patterns**:
- Bottom navigation bar with CodePen-style buttons (Chakra Petch font)
- "The Mine" button returns to main tech pages
- Category buttons trigger full-screen overlay details
- State-driven navigation (not router-based) for category overlays

### CSS Architecture & Visual Effects

**Skewed Layout System**:
- CSS `clip-path` and `transform: skewX()` for angled layouts
- CSS variables: `--skew-deg`, `--magic-vh`, `--scroll-time` for consistent theming
- Split-screen animations with `cubic-bezier` transitions
- Semi-transparent backgrounds to allow particle effects visibility

**Button Styling**:
- Rectangular tech buttons (not skewed) with border animations
- Pseudo-element corner effects for interactive states
- Consistent typography using Chakra Petch font family

**Particle Canvas Integration**:
- Canvas positioned with `position: absolute` behind content
- Z-index layering to ensure proper content hierarchy
- Responsive particle density based on screen size

## Router Configuration

```
/                          → MainPage (HomePage + TechShowcasePage + InfiniteHero)
/:techType/:categoryId     → CategoryDetailPage (legacy route)
/tech/hph                  → HPHDetailPage (standalone tech detail page)
/tech/pef                  → PEFDetailPage (standalone tech detail page)
/video/hph                 → HPHVideoPage (video showcase)
/video/pef                 → PEFVideoPage (video showcase)
```

Primary navigation uses state management within TechShowcasePage rather than routing for category details.

## Important Implementation Notes

**Animation Lifecycle**:
- TextShuffler instances must be destroyed in useEffect cleanup: `shufflerInstance?.destroy()`
- Canvas animations require proper cleanup on component unmount
- Remove event listeners and clear RAF loops to prevent memory leaks

**Canvas Particle System**:
- Particle movement uses wave-based patterns with configurable amplitude
- Performance optimized with `Math.round()` for pixel-aligned rendering
- Mobile devices use reduced particle counts for smooth performance

**CSS Layer Management**:
- `.skw-page__skewed` backgrounds use semi-transparent colors for particle visibility
- Navigation bar positioned absolutely to prevent homepage visibility
- Z-index hierarchy: Navigation (highest) → Content → Particles (lowest)

**Responsive Design**:
- Mobile breakpoints at 768px and 480px
- Adjusted skew angles and simplified layouts for smaller screens
- Particle density scales with viewport size

## Common Layout Issues and Solutions

**Particle Visibility**:
- Issue: Canvas particles hidden behind opaque backgrounds
- Solution: Use `rgba()` or `transparent` backgrounds in `.skw-page__skewed` elements

**Animation Performance**:
- Issue: Lag with high particle counts or complex movements
- Solution: Reduce particle numbers on mobile, use `requestAnimationFrame`, optimize calculations

**Text Overflow in Skewed Containers**:
- Issue: Long Chinese text overflows angled layouts
- Solution: Use `width: 24em`, `word-break: break-all`, `overflow-wrap: break-word`

**Navigation State Conflicts**:
- Issue: Navigation appearing on wrong pages or during transitions
- Solution: Ensure conditions include proper state checks (`showMainPages &&`, etc.)

## File Organization

```
src/
├── App.tsx                     # Main routing configuration
├── main.tsx                    # Application entry point
├── pages/
│   ├── MainPage.tsx           # Combined layout container
│   ├── HomePage.tsx           # Landing page with text animations
│   ├── TechShowcasePage.tsx   # Core tech showcase + particle effects
│   ├── CategoryDetailPage.tsx # Category detail overlay (legacy)
│   ├── HPHDetailPage.tsx      # Standalone HPH technology details
│   ├── PEFDetailPage.tsx      # Standalone PEF technology details
│   ├── HPHVideoPage.tsx       # HPH video showcase
│   └── PEFVideoPage.tsx       # PEF video showcase
├── components/
│   └── ui/
│       └── infinite-hero.tsx  # 3D WebGL shader component
├── utils/                     # Animation utility modules
│   ├── animationLoop.ts       # RAF animation manager
│   ├── letterShuffler.ts      # Character-level animation
│   ├── wordShuffler.ts        # Word-level animation coordination
│   └── textShuffler.ts        # Text block animation sequencing
└── styles/                    # CSS files with custom animations
```

Technology category data arrays are embedded in TechShowcasePage.tsx rather than external configuration files.