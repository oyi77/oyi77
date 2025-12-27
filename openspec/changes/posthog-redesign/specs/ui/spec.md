## ADDED Requirements
### Requirement: PostHog Design System Application
The system SHALL apply PostHog-inspired design tokens to all core UI elements to ensure a "soulful" aesthetic.

#### Scenario: Button Interaction
- **WHEN** a user hovers over a primary button
- **THEN** it SHALL translate up by 2px and increase shadow offset (tactile lift).
- **WHEN** a user clicks a primary button
- **THEN** it SHALL translate down by 2px and collapse shadow (tactile press).

#### Scenario: Window Styling
- **WHEN** a window is rendered
- **THEN** it MUST have a 2px solid border (color: `black` or `dark-gray`).
- **AND** it MUST have a hard-edge shadow (offset 4px, blur 0px).
- **AND** the background MUST be solid or slightly textured (no glassmorphism unless specifically 'retro-glass').

## MODIFIED Requirements
### Requirement: Desktop Background
The desktop background SHALL render a "Paper/Tan" color (`#f3f4ef`) with a subtle `dot-grid` pattern instead of the One Piece Map.

#### Scenario: Background Rendering
- **WHEN** the desktop loads
- **THEN** it MUST display the tan color and dot grid pattern.
