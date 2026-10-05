Brand-coloured chips for the tool popover in the home bio.

Each file is a filled circle in the vendor's brand colour with a simplified
glyph on top — drawn to the right silhouette and the right colour, not to
official brand geometry. They are chips rather than bare glyphs so dark marks
(Notion, Cursor, Vercel, GitHub) stay legible on a dark pill without any CSS
filter.

`ToolPopover` renders them as-is, so swapping in real vendor SVGs works
provided the replacement is round or carries its own background. Keep the
filenames — content/marquee.ts references them by path.
