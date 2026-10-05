# Design constraints — do not violate

## Non-negotiable
- Borders are 0.8px, never 1px
- Radii: 3px, 8px, 16px (--radius-card), 24px (--radius-panel), 999px pills, 50% circles
- All colors come from CSS variables. Never introduce a new hex value anywhere.
- Fraunces is ONLY for the closing quote. Caveat is ONLY for the "Next?" annotation. Everything else is Manrope.
- Every component must be verified in BOTH themes before a stage is done.

## Type scale (desktop / mobile)
H1        24/700/32   |  18/700/24
Quote     32/500/44.8 |  22/500/30   (Fraunces)
H3        18/500/28   |  18/500/28
Body      15/400/24
Meta      14/400/20
Micro     12/400/16-18, uppercase, 0.84px letter-spacing, --ink-3

## Motion — hard ceiling is 0.46s
- Scroll reveal: `fade` 0.28s ease, translateY(6px). Six pixels, not thirty.
- Hover lift: transform 0.26s cubic-bezier(0.34, 1.3, 0.6, 1)
- Buttons: transform 0.1s, background/box-shadow 0.15s
- Segmented toggle: transform 0.34s cubic-bezier(0.34, 1.56, 0.64, 1) + width 0.16s
- Theme toggle: transform,width,height,opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1)
- Popovers: opacity 0.16s + transform 0.2s cubic-bezier(0.34, 1.5, 0.6, 1)
- Links: color 0.15s ease
- Marquees: translateX(-50%) with duplicated content, linear infinite
- Everything respects prefers-reduced-motion

## Layout
App shell 1120px | reading column 640px | case study column 720px
Nav bars 72px desktop, 68px mobile. view-inner padding 32px desktop, 20px mobile.

## Content rule
Sections render from typed arrays in content/. An empty array renders nothing.
Never hardcode copy into a component.

The reduced-motion block in globals.css switches marquees off by SELECTOR, not by
animation name. Every marquee must therefore carry one of `[data-marquee]`,
`.marquee`, or `.marquee-track` — otherwise it keeps scrolling for users who asked
for less motion.

## Forbidden
Gradient text · glassmorphism beyond the two nav bars · scroll-jacking · parallax ·
stagger beyond 40ms · emoji as icons · larger type "for impact" · new accent colors ·
0.6s fades · 30px reveal travel · inventing content where a PLACEHOLDER exists
