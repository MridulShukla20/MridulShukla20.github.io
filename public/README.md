# Static assets

Drop the real files in at these exact paths — nothing here is generated.

| Path                 | Used for                                      |
| -------------------- | --------------------------------------------- |
| `footer-dark.webp`   | Footer artwork, dark theme                     |
| `footer-light.png`   | Footer artwork, light theme                    |
| `avatar.png`         | Profile photo                                  |

`avatar.png` is intentionally absent. Until it exists, Stage 1 renders a monogram
fallback: "M", Manrope 600, `--ink` on `--panel`, 50% radius, 0.8px solid `--stroke`.
Do not substitute an external image.
