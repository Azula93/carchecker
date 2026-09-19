---
name: Automotive Precision Minimal
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#44474c'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#535f72'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#101c2c'
  on-primary-container: '#798498'
  inverse-primary: '#bbc7dd'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fc'
  on-secondary-container: '#57657a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002109'
  on-tertiary-container: '#009842'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e3fa'
  primary-fixed-dim: '#bbc7dd'
  on-primary-fixed: '#101c2c'
  on-primary-fixed-variant: '#3c4759'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  tech-data-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.02em
  tech-data-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  tech-data-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system delivers an experience where Apple-calibrated reduction meets automotive structural discipline. Built expressly for physical vehicle appraisals and diagnostic workflows, the aesthetic rejects the over-engineered clutter of diagnostic scan tools and the generic styling of standard enterprise software.

### Personality & Demeanor
- **Sober & Authoritative:** Decisions are presented as absolute, unclouded by decorative noise or ambiguous gradients.
- **Architectural Clarity:** Generous whitespace, razor-sharp alignment, and structural hairline boundaries evoke fine German industrial engineering.
- **High Legibility Under Direct Sunlight:** Designed for on-the-lot vehicle inspections under harsh ambient daylight, demanding maximum contrast, large tactile hit targets, and unmistakable typographic hierarchy.

### Design Movement
**Automotive Minimal:** A synthesis of Swiss modernist reduction and contemporary industrial instrument panels. The system relies on pure optical whites, deep petroleum structural anchors, subtle mechanical grays, and strictly semantic status states. Surface depth is expressed through surgical 1px hairline edges rather than heavy, indistinct drop shadows.

## Colors

Color is treated as architectural infrastructure rather than decoration. Deep petroleum shades anchor primary actions and structural headers, cool slates handle secondary metadata, and high-saturation colors are locked strictly behind evaluation states.

### Core Palette
- **Primary / Brand Identity:**
  - `petroleum-900` (`#0F1B2B`): Primary interactive elements, primary text, brand grounding.
  - `petroleum-800` (`#1A2B42`): Secondary interactive surfaces, hover states for dark elements.
  - `petroleum-700` (`#2B4263`): Active states, focused outlines, technical borders.
- **Secondary / Cool Neutrals:**
  - `slate-700` (`#334155`): Secondary body text, subheadings.
  - `slate-600` (`#475569`): Supporting metadata, inactive icon fills.
  - `slate-500` (`#64748B`): Placeholder text, neutral states, passive icons.
  - `slate-400` (`#94A3B8`): Subtle technical captions, disabled elements.
- **Surfaces & Backgrounds:**
  - `surface-canvas` (`#F8FAFC`): Base screen substrate (mist white) to eliminate glaring eye fatigue while maintaining 95%+ contrast.
  - `surface-card` (`#FFFFFF`): Primary elevated card containers, sheets, and interactive surfaces.
  - `surface-subtle` (`#F1F5F9`): Segmented control tracks, neutral state chips, and disabled inputs.
- **Hairline Dividers & Outlines:**
  - `border-subtle` (`#E2E8F0`): Primary 1px dividing lines, card borders, and cell dividers.
  - `border-strong` (`#CBD5E1`): Active input boundaries, resting segmented control boundaries.

### Strict Functional Semantics
Semantic tokens are prohibited from being used for decorative flair, branding accents, or illustrative graphics. They appear solely when signaling mechanical, structural, or legal status. Each status token pairs a high-contrast ink color with a soft tint container and explicit border:

- **Favorable (Bueno):**
  - Ink: `#16A34A` | Surface: `#F0FDF4` | Border: `#BBF7D0`
- **Caution (Regular / Precaución):**
  - Ink: `#D97706` | Surface: `#FFFBEB` | Border: `#FDE68A`
- **Critical (Malo / Alerta):**
  - Ink: `#DC2626` | Surface: `#FEF2F2` | Border: `#FECACA`
- **Neutral (N/A / No Aplica):**
  - Ink: `#64748B` | Surface: `#F1F5F9` | Border: `#E2E8F0`

## Typography

The typography system pairs **Inter** for rational UI structure and administrative clarity with **JetBrains Mono** for technical diagnostic values. 

### Typographic Roles
- **Inter (Prose & Operational Controls):** Delivers clean optical tracking and strong legibility across dense checklists, multi-row tables, and administrative forms. Weights 600 and 700 are reserved for titles and section landmarks to ensure scanning speed.
- **JetBrains Mono (Technical Values Only):** Applied exclusively to non-prose automotive data points: odometer readouts (e.g., `84,230 km`), vehicle identification numbers (`VIN`), license plate designations (`XYZ-890`), currency valuations, engine displacement metrics, and percentage degradation stats. Monospaced alignment guarantees zero character jitter during live numerical comparison.

## Layout & Spacing

The layout is built on an absolute 8-point geometric scale, tailored for single-handed mobile usage in vehicle service bays, dealer lots, and auction lines.

### Screen Adaptations
- **Mobile Handheld (360px – 639px):** Single-column stacked layout. Content spans full device width minus `1rem` outer screen margin (`margin`). Critical actionable components maintain 48px minimum height. All inspection rows stack checklist options directly beneath item labels.
- **Tablet / In-Bay Terminal (640px – 1023px):** 6-column fluid grid with `1.5rem` gutters (`gutter-md`) and `2rem` margins (`margin-md`). Splits primary diagnostic categories (e.g., Engine vs. Chassis) into concurrent dual-panel split sheets.
- **Desktop / Appraisal Suite (1024px+):** 12-column fixed-max grid (max container width: `1200px`) centered with `3rem` margins (`margin-lg`). Layout dedicates 8 columns to the linear inspection dossier and 4 columns to real-time valuation, database verification badges, and summary scoring cards.

## Elevation & Depth

This design system avoids multi-layer skeuomorphic drops or saturated blurred shadows. Visual depth is established through physical boundary precision and tonal contrast.

### Planar Architecture
- **Level 0 (Canvas):** Flat substrate (`#F8FAFC`). No borders, no shadows.
- **Level 1 (Card & Module Surfaces):** Pure White (`#FFFFFF`) grounded by a strict 1px boundary: `border: 1px solid #E2E8F0`. Elevation shadow is minimal, crisp, and neutral:
  `box-shadow: 0 1px 2px 0 rgba(15, 27, 43, 0.04)`.
- **Level 2 (Dropdowns, Flyouts & Action Sheets):** Pure White (`#FFFFFF`) with a micro-offset:
  `box-shadow: 0 4px 12px -2px rgba(15, 27, 43, 0.08), 0 1px 3px 0 rgba(15, 27, 43, 0.04)`.
  Border: `1px solid #CBD5E1`.
- **Level 3 (Inspection Modals & Diagnostic Sheets):**
  `box-shadow: 0 12px 28px -4px rgba(15, 27, 43, 0.12)`.
  Canvas backdrop: `rgba(15, 27, 43, 0.40)` with `backdrop-filter: blur(4px)`.

## Shapes

The geometric radius language strikes a balance between Apple-like smoothness and machined precision. 

### Geometric Rules
- **Base Components (`rounded`, 8px / 0.5rem):** Buttons, text inputs, checklist segments, table cell containers, and status badges. This curvature creates an ergonomic touch affordance without softening into consumer toy aesthetics.
- **Structural Modules (`rounded-lg`, 16px / 1.0rem):** Diagnostic group cards, report summaries, floating sheets, and modals.
- **Inner Nested Radius Principle:** Child elements inside cards adhere to concentric nesting formulas: `Radius_Child = Radius_Parent - Padding`. A card with `16px` radius and `8px` padding houses children with exactly `8px` corner radius.

## Components

All interactive components strictly enforce a minimum tap target of `48px` to guarantee zero miss-taps during one-handed field inspections.

### Buttons
- **Primary:** Background `#0F1B2B`, text `#FFFFFF`, border none, radius `8px`. Active state transitions to `#1A2B42`. Height: `48px`. Font: `label-md`.
- **Secondary / Outline:** Background `#FFFFFF`, text `#0F1B2B`, border `1px solid #CBD5E1`, radius `8px`. Active background `#F1F5F9`. Height: `48px`.
- **Ghost:** Background transparent, text `#475569`, border none. Active background `#F1F5F9`.
- **External Authority Link Button (RUNT, SIMIT, Fasecolda):**
  Base layout: `#FFFFFF` surface with `1px solid #E2E8F0`. Contains official institution micro-label, high-contrast title, verified query indicator, and a locked `16px` directional external arrow icon (`↗`) in `#64748B`. Pressed state scales subtly to `99%` transform.

### Checklist Evaluation Controls (4-State Segmented Segment)
The central operational pattern of the application. Replaces ambiguous sliders with an explicit four-way segmented control:
- **Structure:** A unified container (`#F1F5F9` background, `1px solid #E2E8F0`, height `48px`, radius `8px`) split into four equal touch zones:
  1. `[ ✓ Bueno ]`
  2. `[ △ Regular ]`
  3. `[ × Malo ]`
  4. `[ — N/A ]`
- **State Behavior:**
  - *Unselected:* Text `#64748B`, transparent background, zero border.
  - *Selected (Bueno):* Background `#F0FDF4`, border `1px solid #BBF7D0`, text and icon `#16A34A`, font weight `600`.
  - *Selected (Regular):* Background `#FFFBEB`, border `1px solid #FDE68A`, text and icon `#D97706`, font weight `600`.
  - *Selected (Malo):* Background `#FEF2F2`, border `1px solid #FECACA`, text and icon `#DC2626`, font weight `600`.
  - *Selected (N/A):* Background `#FFFFFF`, border `1px solid #CBD5E1`, text and icon `#475569`, font weight `600`.
- **Rule:** Never communicate state through color alone. Every option renders an unmistakable geometric symbol alongside literal text.

### Inspection Item Row
- Layout: Horizontal flex container with `1rem` vertical padding, bottom border `1px solid #E2E8F0`.
- Left Side: Item label in `body-md` (`#0F1B2B`), accompanied by secondary prompt or parameter description in `body-sm` (`#64748B`).
- Right Side (or below on mobile): 4-State Segmented Control.

### Badges & Technical Metric Callouts
- **Status Badges:** Compact pills with `4px` vertical padding, `10px` horizontal padding, radius `6px`. Typographic style `label-sm`. Employs the strict semantic color pairs (Favorable, Caution, Critical, Neutral).
- **Metric Callout Blocks:** High-density readouts for technical data:
  - Container: `#F8FAFC` background, `1px solid #E2E8F0`, padding `12px 16px`, radius `8px`.
  - Subtitle: Upper-case tracking `body-sm` (`#64748B`).
  - Primary Metric: `tech-data-lg` (`#0F1B2B`) in JetBrains Mono.

### Input Fields
- Height: `48px`. Surface: `#FFFFFF`. Border: `1px solid #CBD5E1`, radius `8px`. Typography: `body-md`.
- Focus State: Border color `#0F1B2B`, box shadow `0 0 0 1px #0F1B2B`.
- Number/Technical Inputs (KM, Plate, Chassis): Forced to `JetBrains Mono` font mapping with right-aligned unit indicator (e.g., `KM`, `USD`, `COP`).

### Cards & Group Containers
- Surface: `#FFFFFF`. Border: `1px solid #E2E8F0`. Radius: `16px`.
- Card Header: Border-bottom `1px solid #F1F5F9`, padding `16px 20px`. Header title uses `headline-md` paired with a category status counter badge (e.g., `12/14 Verificado`).