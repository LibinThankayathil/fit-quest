---
name: FitQuest
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#4ae183'
  on-secondary: '#003919'
  secondary-container: '#06bb63'
  on-secondary-container: '#00431f'
  tertiary: '#ffffff'
  on-tertiary: '#500a6c'
  tertiary-container: '#f8d8ff'
  on-tertiary-container: '#8a49a5'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#6bfe9c'
  secondary-fixed-dim: '#4ae183'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#f8d8ff'
  tertiary-fixed-dim: '#ebb2ff'
  on-tertiary-fixed: '#320047'
  on-tertiary-fixed-variant: '#692984'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-stat:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 24px
  gutter: 16px
  card-padding: 20px
  stack-gap: 12px
---

## Brand & Style
The design system is engineered for high-performance fitness tracking, blending a **Modern Corporate** structure with **High-Contrast** energetic accents. The brand personality is aggressive, motivating, and professional, designed to make users feel like elite athletes.

The aesthetic utilizes a deep dark-mode foundation to reduce eye strain during early morning or late-night workouts, allowing the vibrant primary accents to command immediate attention. The style leverages subtle glassmorphism and soft elevation to create a sense of premium depth without cluttering the interface.

**Key Stylistic Principles:**
- **Kinetic Energy:** Use of diagonal leans in iconography and progress indicators to imply forward motion.
- **Data-First:** Statistics are treated as hero elements, using massive scale to celebrate user achievements.
- **Premium Depth:** Layers are defined by tonal shifts rather than heavy borders, maintaining a sleek, sophisticated feel.

## Colors
The palette is dominated by the contrast between the void-like background and the "Electric Lime" primary.

- **Primary (Electric Lime):** Reserved for high-priority actions, success states, and active progress tracking. It should be used sparingly but impactfully.
- **Secondary (Vibrant Green):** Used for positive trends, completed tasks, and secondary health metrics.
- **Tertiary (Muted Purple):** Specifically allocated for complex data visualization (e.g., recovery scores, sleep cycles) to provide visual separation from active workout data.
- **Neutrals:** A multi-layered dark scale. `#121212` for the true background, `#1E1E1E` for primary cards, and `#2C2C2E` for nested elements or hover states.

## Typography
This design system utilizes a dual-font strategy. **Montserrat** provides a bold, geometric authority for headlines and statistical callouts, while **Inter** ensures maximum legibility for functional UI text and body copy.

- **Statistical Numbers:** Always use `display-stat` for primary metrics (Steps, Calories, Heart Rate). The heavy weight and tight letter-spacing create a sense of urgency and importance.
- **Labels:** Use `label-caps` for table headers and small metadata categories to maintain a clean, organized hierarchy.
- **Scale:** On mobile devices, headlines should scale down to prevent awkward line breaks, while body text remains consistent at 16px for readability.

## Layout & Spacing
The layout follows a **Fluid Grid** system with generous internal padding to emphasize whitespace and content clarity. 

- **Desktop/Tablet Sidebar:** A fixed 280px sidebar navigation creates a persistent anchor.
- **Grid:** Use a 12-column grid for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** All spacing must be a multiple of 8px. Use 24px margins for the main container to allow the "dark" background to frame the content effectively.
- **Card Layouts:** Horizontal stacks (Flexbox) are preferred for stats, while vertical stacks are used for activity feeds and leaderboards.

## Elevation & Depth
Depth is achieved through **Tonal Layering** supplemented by extremely soft, large-radius shadows. 

1. **Level 0 (Background):** `#121212` - The base canvas.
2. **Level 1 (Cards/Sidebar):** `#1E1E1E` - Raised surface. Use a subtle 1px border of `#2C2C2E` to define edges on screens with lower contrast.
3. **Level 2 (Modals/Popovers):** `#2C2C2E` - The highest surface. Apply a 20% opacity black shadow with a 40px blur to create a "floating" effect.

Avoid pure black shadows; instead, use shadows tinted with the primary color at 5-10% opacity for "glowing" interactive elements like active progress bars or primary buttons.

## Shapes
The shape language is consistently **Rounded**, communicating a modern and approachable feel while remaining structured.

- **Cards & Modals:** Use `rounded-lg` (16px) as the standard for all main containers.
- **Buttons & Chips:** Use `rounded-xl` (24px) or full pill-shape to distinguish interactive elements from content containers.
- **Progress Bars:** Ends must always be fully rounded (caps) to match the kinetic, fluid nature of the brand.

## Components
- **Action Buttons:** Primary buttons use the Electric Lime background with black text for maximum contrast. Apply a subtle lime outer glow on hover.
- **StatsCard:** Features a `display-stat` number, a small `label-caps` subtitle, and a mini-sparkline chart at the bottom.
- **ActivityCard:** A horizontal layout with an icon (circular background), activity name, duration, and a "chevron-right" affordance.
- **LeaderboardTable:** Rows should have alternating background highlights or a subtle separator. The user's own row is outlined in Electric Lime.
- **Progress Bars:** Dual-track design. The background track is `#2C2C2E`, and the active track uses a linear gradient from Secondary Green to Primary Electric Lime.
- **Sidebar:** Minimalist icons with labels. The "Active" state uses an Electric Lime vertical indicator bar on the far left of the item.
- **Polished Charts:** Use Tertiary Purple and Secondary Green for line/bar charts. Area charts should use a vertical gradient from the stroke color to transparent.