# DESIGN.md — Kaustubh Srikantapuram Portfolio

> Design system document following the Google Stitch DESIGN.md specification.
> Drop this into any AI coding agent context for consistent UI generation.

---

## Overview

**Product:** Personal portfolio website for Kaustubh Srikantapuram  
**Voice:** Confident, understated, professional — speaks through craft, not noise  
**Aesthetic:** "Quiet Confidence" — editorial dark mode with cool, precise tones  
**Anti-patterns:** No glow effects, no neon gradients, no glassmorphism, no AI-slop  

This design system prioritizes **typography, whitespace, and restraint**. Every element earns its place.

---

## Colors

### Semantic Tokens

| Token | Hex | Role |
|-------|-----|------|
| `bg-primary` | `#0A0A0A` | Page background |
| `bg-surface` | `#111111` | Cards, content sections |
| `bg-elevated` | `#1A1A1A` | Hover states, active surfaces |
| `bg-inset` | `#0F0F0F` | Recessed areas, code blocks |
| `border-default` | `rgba(255,255,255,0.08)` | Subtle structural dividers |
| `border-hover` | `rgba(255,255,255,0.16)` | Interactive border state |
| `border-accent` | `rgba(96,165,250,0.25)` | Accent-tinted borders |
| `text-primary` | `#EDEDEA` | Headings, primary content |
| `text-secondary` | `#A0A0A0` | Body copy, descriptions |
| `text-muted` | `#666666` | Metadata, timestamps, labels |
| `accent` | `#60A5FA` | Cool blue — CTAs, active links |
| `accent-hover` | `#93C5FD` | Accent hover state |
| `accent-subtle` | `rgba(96,165,250,0.08)` | Accent backgrounds |

---

## Typography

- **Sans:** `'Inter', system-ui, sans-serif`
- **Mono:** `'JetBrains Mono', monospace`

---

## Do's and Don'ts

### Do
- ✓ Use generous whitespace
- ✓ Keep the accent color rare and intentional
- ✓ Use thin, precise borders for structure
- ✓ Let typography create hierarchy
- ✓ Use semantic HTML5

### Don't
- ✗ No glow effects
- ✗ No neon or saturated accent colors
- ✗ No glassmorphism
- ✗ No parallax scrolling
- ✗ No animated gradient backgrounds
- ✗ No text-shadow
