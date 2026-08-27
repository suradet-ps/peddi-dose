# Design System - Pedi-Dose

## 1. Visual Theme & Atmosphere

Pedi-Dose is a pediatric liquid-dose calculator for healthcare professionals - a single-screen tool that must feel precise, calm, and trustworthy. The interface is built around one job: choose a drug, enter a weight, read the result. Everything in the visual system serves that clarity.

The page opens with a soft radial glow at the top of the viewport - a barely-there wash of blue that gives the canvas warmth without competing with content. Below it sits a compact hero (title + subtitle), then a single elevated card containing the entire workflow. The card floats on a light slate canvas with layered, soft shadows, and the result appears inside a blue-tinted panel so the answer is impossible to miss.

**Key Characteristics:**
- Single-screen, single-column layout with a clear flow: hero -> input card -> result
- Soft, layered elevation: cards cast gentle multi-layer shadows instead of sitting flat
- One chromatic accent - Blue (`#3E6AE1`) - used for interactive states, focus rings, and the result value
- Restrained gradient: used only on the error-boundary button and background glow, never on content surfaces
- Slate-based neutrals in both light and dark mode, tuned for Thai text legibility
- Step indicators (numbered circles) give the two-field form a guided, wizard-like feel
- 0.25s cubic-bezier transitions for all interactive state changes
- Dark mode follows the system preference automatically, with a fully re-tuned palette
- `prefers-reduced-motion` disables all animation for users who request it

## 2. Color Palette & Roles

### Primary
- **Blue** (`#3E6AE1`): The single chromatic accent. Used for the result value, focus rings, step numbers, toggle (pressed state), notes label, and skip link. In dark mode it shifts to a lighter `#6F8FF2` to hold contrast on dark surfaces
- **Blue Soft** (`rgba(62,106,225,0.09)` light / `rgba(111,143,242,0.14)` dark): Tinted panel background for the result card and step-number circles
- **Blue Border** (`rgba(62,106,225,0.22)` light / `rgba(111,143,242,0.32)` dark): Hairline border for the result card and toggle pill

### Surface & Background
- **Canvas** (`#F6F8FB` light / `#0B0F19` dark): Page background - a cool off-white in light mode instead of pure white, keeping the white card visibly elevated
- **Surface** (`#FFFFFF` light / `#121826` dark): Card panels and input focus background
- **Surface Muted** (`#F1F4F9` light / `#1A2233` dark): Input field fill at rest
- **Border** (`#E4E8F0` light / `#232C40` dark): Default hairline borders on cards and inputs
- **Border Strong** (`#D3DAE6` light / `#2F3A52` dark): Hover border on inputs and dashed empty-state border

### Neutrals & Text
- **Ink** (`#101828` light / `#F2F5F9` dark): Primary text - headings, labels, input values
- **Slate** (`#475467` light / `#C3CBDC` dark): Body text and result notes
- **Pewter** (`#667085` light / `#97A1B8` dark): Tertiary text - subtitle, secondary result, kg suffix
- **Silver** (`#98A2B3` light / `#5E6A82` dark): Placeholder text and empty-state message

### Gradient System
- **Accent Gradient** (`linear-gradient(135deg, #3E6AE1, #6F8FF2)` light / `#6F8FF2 -> #9DB4F7` dark): Used in exactly two places - the error-boundary retry button and nowhere else. The gradient exists to give the rare destructive/retry action a moment of visual weight
- **Top Glow** (`rgba(62,106,225,0.08)` light / `rgba(111,143,242,0.12)` dark): A fixed radial gradient (320px tall) washing down from the top of the viewport, behind all content. Subtle enough to read as lighting, not decoration

## 3. Typography Rules

### Font Family
- **System stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Leelawadee UI', 'Noto Sans Thai', Tahoma, 'Helvetica Neue', Arial, sans-serif` - the stack explicitly includes Thai-friendly faces (Leelawadee UI, Noto Sans Thai, Tahoma) after the Latin-first system fonts, since the UI copy is Thai
- No webfonts are loaded (CSP is `font-src 'self'`), keeping the install offline-capable and fast
- No italic or decorative variants are used

### Hierarchy

| Role | Size | Weight | Line Height | Notes |
|------|------|--------|-------------|-------|
| Hero Title | 28px (1.75rem) mobile, 32px (2rem) desktop | 600 | 1.25 | "คำนวณขนาดยาน้ำเด็ก" |
| Subtitle | 15px (0.9375rem) | 400 | 1.55 | Tertiary text |
| Field Label | 14px (0.875rem) | 600 | - | Ink, paired with step number |
| Result Value | 38px (2.375rem) mobile, 48px (3rem) desktop | 600 | 1.15 | Blue, tabular-nums, -0.02em tracking |
| Secondary Result | 15px (0.9375rem) | 400 | - | Pewter, tabular-nums |
| Notes Label | 11px (0.6875rem) | 600 | - | Uppercase, 0.08em tracking, Blue |
| Body / Notes | 15px / 12px | 400 | 1.55 | Slate |

### Principles
- **Three weights only**: 400 (regular) for body and secondary content, 500 (medium) for badges and toggles, 600 (semibold) for headings, labels, and the result value. No bold 700, no light
- **Thai-first legibility**: Thai glyphs keep normal letter-spacing; negative tracking is applied only to numerals (result value, -0.02em)
- **The number is the hero**: the result uses tabular-nums so digits never jump while typing, at 38-48px semibold in Blue - the single loudest element on the page
- **Uppercase only for micro-labels**: the 11px "คำแนะนำ" label is the only uppercase text, functioning as a caption, not display type

## 4. Component Stylings

### Buttons
Two button flavors exist, both pill-shaped (999px radius):

**Manual-dose Toggle** - the only in-flow button:
- Default: Blue Soft background, Blue border, Blue text, 12px caption, semibold, padding 6px 12px, with a 12px sliders icon
- Hover: background deepens to Blue Border
- Pressed (`aria-pressed="true"`): solid Blue background, white text, small shadow - the pill flips from "off" to "on" state
- Used for: "ระบุเอง" / "ปิด" manual dose mode

**Error-boundary Retry Button** - full-width of its container:
- Background: Accent Gradient, white semibold text, 15px, padding 10px 24px, pill radius
- Hover: brightness lifts 8%
- Used for: "ลองใหม่" recovery action

**Skip Link** - off-canvas until focused:
- Blue background, white text, pill radius, positioned top-left; slides into view on keyboard focus

### Cards & Containers

**Input Card** (the main workflow panel):
- Background: Surface (white in light mode), 1px Border hairline, 16px radius
- Elevation: two-layer soft shadow (`--shadow-md`) that reads as "lifted paper", not "floating glass"
- Inner padding: 24px mobile, 32px desktop; children stack with 16-24px gaps

**Result Panel** (inside the input card):
- Background: Blue Soft, 1px Blue Border, 16px radius, 24px padding
- Contains: "ผลลัพธ์" micro-label with a 7px blue dot, the large value, the secondary mg/dose line, and a notes block separated by a Blue Border hairline

**Empty State**:
- Same 16px radius but dashed Border Strong and transparent background
- Centered 28px calculator icon (Pewter) + placeholder-colored prompt ("กรุณากรอกน้ำหนัก" / "กรุณากรอกขนาดยา (mg/kg/dose)")

### Inputs & Forms
- Height: 52px, full width, 12px radius
- Rest: Surface Muted fill, 1px Border, placeholder in Silver
- Hover: border deepens to Border Strong
- Focus: fill flips to Surface (white), border flips to Blue, plus a 4px Blue focus ring (`--shadow-focus`) - no double outline
- Number inputs hide native spinners; weight input carries a "kg" suffix sitting inside the field on the right (Pewter, medium weight, non-interactive)
- Select uses the same field styling with a chevron icon nested in a 26px circle chip (Surface fill, Border hairline) on the right
- Step numbers: 22px circles (50% radius) in Blue Soft with a Blue semibold numeral, placed inline before each field label

### Layout Rhythm
- Skip link -> hero (title + subtitle) -> input card (select, weight, optional manual dose, result) - no header bar, no footer chrome
- The page intentionally has no persistent navigation: the entire app fits one screen and one task

## 5. Layout Principles

### Spacing System
- **Base unit**: 8px
- **Page padding**: 16px horizontal on mobile, 40px vertical top, 48px bottom
- **Card padding**: 24px mobile, 32px desktop
- **Field gaps**: 8px between label and input, 16px between fields, 24px between hero and card

### Grid & Container
- **Max width**: 440px - a deliberately narrow column keeps the form focusable and thumb-friendly
- Everything is centered horizontally; the hero is left-aligned within the same 440px column
- The top glow spans the full viewport width behind the column

### Whitespace Philosophy
The layout gives each piece of the task its own zone: the hero announces the tool, the card is the workspace, the tinted panel is the answer. Whitespace between zones (24-32px gaps) lets the eye travel select -> weight -> result without scanning clutter. The empty state keeps that rhythm honest - before data entry, the result slot is a quiet dashed placeholder, not dead space.

### Border Radius Scale
| Value | Context |
|-------|---------|
| 8px | Small chips (chevron circle, step badges context) |
| 12px | Inputs and select fields |
| 16px | Cards, panels, result box |
| 999px | Pills - toggle, retry button, skip link |
| 50% | Step-number circles, status dots |

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 (Flat) | No shadow | Page background, inline text, notes |
| Level 1 (Shadow-sm) | `0 1px 2px rgba(16,24,40,.05), 0 1px 3px rgba(16,24,40,.04)` | Small elements needing a hair of separation |
| Level 2 (Shadow-md) | `0 2px 4px rgba(16,24,40,.04), 0 8px 24px -6px rgba(16,24,40,.10)` | The input card - the only elevated surface |
| Focus Ring | `0 0 0 4px rgba(62,106,225,.16)` | Keyboard focus on inputs, selects, buttons |

### Shadow Philosophy
Elevation is a hierarchy with exactly two rungs: the card sits above the canvas, everything else sits on the card. The shadows are multi-layer and low-opacity - enough to separate, never enough to dramatize. In dark mode shadows nearly disappear (the palette is dark on dark), so separation comes from the 1px Border hairlines instead.

### Decorative Depth
- The only atmospheric effect is the fixed top glow, which exists to soften the canvas, not to decorate content
- No element uses a glow, blur, or outline as decoration; `backdrop-filter` is not used anywhere in the app
- The result panel achieves emphasis through tint (Blue Soft) and border, not through shadow or gradient

## 7. Do's and Don'ts

### Do
- Keep the app a single screen with a single task flow: hero, card, result
- Use Blue (`#3E6AE1`) for interactive states and the result value - it is the only chromatic color in the system
- Elevate exactly one surface: the input card. Everything else lives flat on the canvas
- Use 16px radius for panels and 12px for inputs, with pill shapes reserved for buttons
- Show results inside the Blue Soft panel with the large tabular numeral as the loudest element
- Keep field labels semibold with step-number circles so the two-step flow is self-explanatory
- Use the accent gradient only on the retry button - it is a punctuation mark, not a theme
- Support `prefers-reduced-motion` and keep every transition at 0.25s
- Let dark mode re-tune the palette (lighter blue, slate surfaces) instead of inverting mechanically

### Don't
- Add a header, navigation, or footer chrome - the tool has no navigation needs
- Use more than one chromatic color or introduce semantic colors (green/red/yellow) for status
- Apply the gradient to content text, cards, or icons - only the retry button
- Use shadows on inputs, buttons, or inline elements - elevation is reserved for the card
- Use uppercase transforms beyond the 11px notes label
- Use fonts that cannot render Thai well - the stack must always include Thai-capable fallbacks
- Add hover animations with scale or translate transforms - interaction is color- and border-only
- Crowd the 440px column - one card, two fields, one result

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <600px | Result value 38px, hero title 28px, card padding 24px |
| Tablet+ | >=600px | Result value 48px, hero title 32px, card padding 32px, larger gaps between zones |

The layout is single-column at every size; there are no sidebar or multi-column variants. The 440px column keeps the form centered on phones, tablets, and desktops alike.

### Touch Targets
- Inputs: 52px tall (above the 44px WCAG minimum) with full-width tap area
- Manual toggle: 32px+ tall pill with 6px 12px padding - adequate for touch
- Select: 52px tall with a 26px chevron chip
- Step circles and dots are decorative companions to labels, never standalone targets

### Collapsing Strategy
- The manual-dose field slides in below the weight field (0.25s fade + 4px translate) and is removed from the flow entirely when toggled off
- The result panel always occupies the same slot - it swaps between the dashed empty state and the tinted result, so nothing shifts on the page

### Behavior Notes
- Keyboard focus is visible everywhere: inputs and selects get the Blue focus ring, buttons get the ring via `:focus-visible`
- `prefers-reduced-motion` reduces all animation and transition durations to ~0
- The theme-color meta and app color scheme react to `prefers-color-scheme` automatically

## 9. Agent Prompt Guide

### Quick Color Reference
- Accent / result value: "Blue (#3E6AE1)"
- Tinted panel: "Blue Soft" (`rgba(62,106,225,0.09)` light)
- Page background: "Canvas (#F6F8FB)"
- Card surface: "Surface (#FFFFFF)"
- Input fill: "Surface Muted (#F1F4F9)"
- Hairline borders: "Border (#E4E8F0)"
- Headings: "Ink (#101828)"
- Body text: "Slate (#475467)"
- Tertiary text: "Pewter (#667085)"
- Placeholder: "Silver (#98A2B3)"
- Dark mode: canvas `#0B0F19`, surface `#121826`, accent `#6F8FF2`

### Example Component Prompts
- "Build the input card: a white Surface panel with 1px Border, 16px radius, soft two-layer shadow, 24px padding, containing the drug select and weight field stacked with 16px gaps"
- "Create the result panel: Blue Soft background, Blue Border hairline, 16px radius, with a 'ผลลัพธ์' micro-label (uppercase-ish caption, Blue, with a 7px Blue dot), the 38-48px semibold Blue tabular value, the secondary Pewter mg/dose line, and a notes block separated by a Blue Border hairline"
- "Style a form input: 52px tall, 12px radius, Surface Muted fill, 1px Border that deepens on hover; on focus flip to white fill with a Blue border and a soft 4px Blue ring - no double outline"
- "Design the manual-dose toggle: a pill (999px) with Blue Soft fill, Blue border, Blue semibold 12px text and a small sliders icon; pressed state flips to solid Blue with white text"
- "Add an empty state for the result slot: transparent background, dashed Border Strong, 16px radius, centered Pewter calculator icon above a Silver hint message"

### Iteration Guide
When refining screens generated with this design system:
1. Focus on ONE component at a time - the system is small enough that each element must be pixel-perfect
2. Reference specific color names and hex codes from this document - there are only 7 neutral tones plus one accent
3. Use natural language descriptions alongside measurements - "soft two-layer shadow" communicates more than a shadow value alone
4. Always check both light and dark mode - the dark palette is re-tuned, not inverted
5. Preserve the single-screen flow - if a change requires navigation, it does not belong in this app