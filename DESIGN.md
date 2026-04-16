# Design Brief: ICP Refiner

**Purpose**: Professional B2B SaaS tool for analyzing and refining Ideal Customer Profiles. Data-focused, high information density, productivity-first aesthetic.

**Tone & Differentiation**: Clean, structured, no decoration beyond functional elegance. Every pixel serves information hierarchy and clarity.

## Palette

| Token           | Light              | Dark               | Usage                      |
| --------------- | ------------------ | ------------------ | -------------------------- |
| Primary         | `0.52 0.15 256`    | `0.65 0.18 256`    | Buttons, links, active UI  |
| Secondary       | `0.92 0.08 45`     | `0.25 0.08 45`     | Secondary actions, badges  |
| Accent          | `0.65 0.2 136`     | `0.75 0.22 136`    | Highlights, chart elements |
| Destructive     | `0.55 0.22 25`     | `0.65 0.19 22`     | Delete, dangerous actions  |
| Neutral/Muted   | `0.90 0 0`         | `0.25 0 0`         | Disabled, secondary text   |

## Typography

| Role    | Font          | Usage                          |
| ------- | ------------- | ------------------------------ |
| Display | General Sans  | Headings, navigation           |
| Body    | General Sans  | Body copy, UI text             |
| Mono    | Geist Mono    | Code, data values, timestamps  |

## Structural Zones

| Zone      | Treatment                                   |
| --------- | ------------------------------------------- |
| Header    | `bg-card border-b border-border shadow-sm`  |
| Main      | `bg-background`                             |
| Cards     | `bg-card border border-border shadow-sm`    |
| Footer    | `bg-muted/10 border-t border-border`        |

## Component Patterns

- **Buttons**: Primary (filled blue), Secondary (outlined), Destructive (red)
- **Forms**: Muted backgrounds, clear labels, inline validation
- **Cards**: Subtle borders, minimal shadows (functional, not decorative)
- **Data Tables**: High contrast text, striped rows (optional), clear hierarchy
- **Badges**: Muted background, small caps for category labels

## Motion

- **Transitions**: Smooth 0.3s cubic-bezier for interactive elements
- **Entrance**: Subtle fade-in + slide-up (8px offset) on card reveal
- **Hover**: Background shift, no bounce or overplay

## Shape Language

- **Border Radius**: `rounded-md` (8px default), `rounded-lg` for larger containers
- **Spacing**: 16px base unit (4px grid), dense but breathing

## Constraints

- No gradients (except subtle chart accents if needed)
- No blur effects or glassmorphism
- Minimal shadows (depth via borders and layering, not effects)
- High contrast for readability (WCAG AA+ standard)
- Mobile-first responsive design

## Signature Detail

Professional data visualization color scheme embedded in chart tokens — allows dashboards to feel cohesive without decoration.
