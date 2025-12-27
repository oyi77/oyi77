# Project Context

## Purpose
A highly interactive, browser-based "Operating System" portfolio (`oyi77-portfolio`). The goal is to showcase the user's skills through a unique, immersive interface ("Grand Line OS") currently themed around One Piece, but targeting a high-quality "PostHog-like" level of polish, animation, and "soul".

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, `clsx`, `tailwind-merge`
- **Animation:** Framer Motion (UI), React Three Fiber (3D), Lottie (desired)
- **State Management:** Zustand (with persistence)
- **Icons:** Lucide React

## Project Conventions

### Code Style
- **Components:** Functional components with typed props.
- **Styling:** Mobile-first Tailwind utility classes. Use `className` prop for overrides.
- **State:** Global UI state in Zustand (`useWindowStore`). Local interactitvity in component state.
- **Imports:** Absolute imports from `@/`.

### Architecture Patterns
- **OS Metaphor:**
  - `DesktopGrid`: Root container logic.
  - `Window`: Generic wrapper for draggable/resizable content.
  - `Taskbar`: Global navigation and window control.
  - `Apps`: Individual capabilities loaded inside Windows.

### Git Workflow
OpenSpec driven:
1.  Propose changes in `openspec/changes/`.
2.  Validate specs.
3.  Implement tasks.
4.  Archive changes.

## Domain Context
- The project mimics a desktop OS inside a browser.
- "Soul" and "Vibe" are critical—animations should be bouncy, physics-based, and delightful (PostHog style).
- Currently transitions from a "One Piece" theme to a more polished, likely "PostHog-inspired" aesthetic.

## Important Constraints
- **Performance:** 3D elements must be lazy-loaded or disabled on mobile.
- **Responsiveness:** Must work seamlessly on mobile (responsive windows/grid).
