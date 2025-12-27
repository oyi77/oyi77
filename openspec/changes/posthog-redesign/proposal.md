# Change: Redesign UI to "Hedgehog OS" (PostHog Style)

## Why
The current "Grand Line OS" interface lacks "soul" and polish. It feels generated and static. The user desires a high-quality, "soulful" design similar to PostHog.com—characterized by retro-tech aesthetics, bold typography, "juicy" physics-based animations, and a distinct lack of "corporate/AI" feel.

## What Changes
- **Design System:** Replace "One Piece" styling (or heavily upgrade it) with a "PostHog-inspired" system (Thick borders, warm retro colors, energetic typography).
- **Animation Engine:** Deep integration of Framer Motion for all interactions (not just open/close).
    - Spring physics on all draggable windows.
    - "Wiggle" effects on hover.
    - Staggered entrances for list items.
- **Components:** Rebuild core OS components (`Window`, `Taskbar`, `Icon`) to be "chunky" and tactile.
- **Tech Stack:** Enforce Framer Motion for all UI state changes.

## Impact
- **Affected Specs:** `ui`, `animation`.
- **Affected Code:** `tailwind.config.ts`, `components/windows/*`, `components/desktop/*`, `app/globals.css`.
- **Breaking:** This will completely overhaul the visual look of the application.
