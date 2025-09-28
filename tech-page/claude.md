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

This is a React 18 + TypeScript tech showcase website with custom animation systems. The project displays dual-core technology solutions (HPH and PEF) through interactive interfaces.

### Key Components Architecture

**MainPage**: Combines HomePage and TechShowcasePage in a single scrollable layout
- **HomePage**: Features custom character shuffling animations with mathematical symbol decorations
- **TechShowcasePage**: Implements skewed split-screen layouts with category navigation system

**Animation System**: Custom-built character shuffling engine consisting of:
- `TextShuffler`: Orchestrates multi-line text animations
- `WordShuffler`: Handles individual word/line shuffling effects
- `LetterShuffler`: Manages character-level animations
- `AnimationLoop`: RAF-based animation timing management

**Navigation Pattern**:
- Bottom navigation bar with CodePen-style buttons (Chakra Petch font)
- "The Mine" button returns to main tech pages
- Category buttons trigger full-screen overlay details
- State management controls view switching between main pages and category overlays

### Page Structure & Data

**TechShowcasePage state management**:
- `currentPage`: Controls HPH (page 1) vs PEF (page 2) display
- `selectedCategory`: Tracks active category for detail overlay
- `showCategoryContent`: Toggles between main pages and category details
- `showMainPages`: Controls main page visibility

**Category Data Arrays**:
- `hphCategories`: 6 categories (饮品与酱料, 保健品与医药, etc.)
- `pefCategories`: 7 categories (高端生鲜肉禽, 预制菜与即食产品, etc.)
- Each category has: id, title, bgColor, leftBgColor, rightBg, description, details

### CSS Architecture

**Skewed Layout System**:
- Uses CSS `clip-path` and `transform: skewX()` for angled layouts
- CSS variables: `--skew-deg`, `--magic-vh`, `--scroll-time` for consistent theming
- Split-screen animations with `cubic-bezier` transitions

**CodePen-style Buttons**:
- Pseudo-element corner border animations
- Chakra Petch font family integration
- Transparent navigation bar that blends with background

## Important Implementation Notes

**Animation Lifecycle**: TextShuffler instances must be properly destroyed in useEffect cleanup to prevent memory leaks. Always call `shufflerInstance?.destroy()` in component unmount.

**CSS Color Contrast**: PEF page right-side content now uses dark background (`#2a3441`) with white text (`#ffffff`) for better readability. This was updated from the original light background to improve visibility.

**Category Detail Overlays**: Use `key={selectedCategory.id}` on category detail components to force re-rendering and restart animations on category change.

**Navigation Bar Positioning**: Navigation bar uses `position: absolute` relative to TechShowcasePage to prevent it from appearing on HomePage. Only visible when `showMainPages && (currentPage === 1 || currentPage === 2)`.

**Text Layout in Category Details**:
- Left side: Title positioned with `padding: 5% 8% 5% 15%` to move content rightward
- Right side: Content constrained to `width: 24em` (approximately 24 Chinese characters per line) to prevent text overflow
- "应用详情" title centered above content block, paragraph text left-aligned within the 24em width

**Responsive Design**: Mobile breakpoints at 768px and 480px with adjusted skew angles and simplified layouts for smaller screens.

## Common Layout Issues and Solutions

**Text Overflow in Category Details**:
- Issue: Long Chinese text can overflow the skewed containers
- Solution: Use `width: 24em` for text blocks, `word-break: break-all`, and `overflow-wrap: break-word`
- Chinese text should be limited to approximately 24 characters per line for optimal display

**Navigation Bar Visibility**:
- Issue: Navigation bar appearing on HomePage when it should only show on tech pages
- Solution: Ensure navigation condition includes `showMainPages &&` to prevent display during category overlays

**Vertical Alignment in Split-Screen**:
- Issue: Content appearing at top or bottom instead of centered
- Solution: Use `justify-content: center` and `align-items: center` on flex containers
- For text-heavy content, may need `justify-content: flex-start` with appropriate padding

## File Organization

- `src/pages/MainPage.tsx`: Main container combining HomePage + TechShowcasePage
- `src/pages/TechShowcasePage.tsx`: Core tech showcase with category navigation
- `src/utils/textShuffler.ts`: Main animation orchestrator
- `src/styles/TechShowcasePage.css`: All skewed layout and navigation styling
- Category data arrays are embedded in TechShowcasePage.tsx (not external files)

## Router Configuration

- `/`: MainPage (HomePage + TechShowcasePage combined)
- `/:techType/:categoryId`: CategoryDetailPage (unused in current implementation)
- `/tech/hph`: HPHDetailPage (placeholder)
- `/tech/pef`: PEFDetailPage (placeholder)

Current navigation uses state management within TechShowcasePage rather than routing for category details.