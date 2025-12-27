## ADDED Requirements
### Requirement: Physics-Based Window Interaction
Windows SHALL behave like physical objects with weight and momentum.

#### Scenario: Window Dragging
- **WHEN** a user drags a window and releases it with velocity
- **THEN** the window SHALL continue moving slightly (momentum) before coming to a stop with a spring damping effect.

### Requirement: Micro-Interactions
Interactive elements SHALL provide immediate visual feedback.

#### Scenario: Icon Hover
- **WHEN** a desktop icon is hovered
- **THEN** it SHALL scale up (1.1x) and rotate slightly (+- 3deg) to feel "alive".
