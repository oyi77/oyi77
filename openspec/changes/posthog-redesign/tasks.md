## 1. Foundation
- [x] 1.1 Update `package.json` with `framer-motion` (ensure latest) and `clsx`/`tailwind-merge` if missing.
- [x] 1.2 Refactor `tailwind.config.ts` to implement PostHog Color Palette (Cream, Dark, Red, Blue, Yellow).
    - [x] Define `colors.tan` (Background).
    - [x] Define `colors.primary` (Action Blue/Red).
    - [x] Define `boxShadow` utilities for "Hard Shadows" (no blur).

## 2. Core Components (The Beads)
- [x] 2.1 Create `components/ui/Button.tsx`:
    - [x] "Juicy" click effect (scale down).
    - [x] Hard shadow that collapses on click.
- [x] 2.2 Create `components/ui/Card.tsx`:
    - [x] Thick border (2px black).
    - [x] Paper texture background option.
- [x] 2.3 Refactor `components/windows/Window.tsx`:
    - [x] Implement `framer-motion` drag with spring physics.
    - [x] Add "Throw" physics (momentum).
    - [x] Update Header UI to be "Retro Tab" style.

## 3. Desktop Environment
- [x] 3.1 Update `DesktopGrid` background to "Tan/Paper" texture with grid dots (PostHog style).
- [x] 3.2 Refactor `StartMenu` to resemble a "Retro Omni-bar" or "Site Map".
- [x] 3.3 Update `Taskbar` to floating "Dock" style with bouncy icons.

## [x] 4. Animation Integration
- [x] 4.1 Implement `HoverWiggle` wrapper component.
- [x] 4.2 Implement `StaggerContainer` utility.
for window content lists.
- [x] 4.3 Add "Page Transition" effect when opening windows (Zoom in/out).
