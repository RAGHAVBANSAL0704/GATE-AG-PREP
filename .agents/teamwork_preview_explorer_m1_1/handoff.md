# Milestone 1 Handoff Report: Web App Manifest & PWA Icon Assets

**Explorer**: `teamwork_preview_explorer_m1_1`  
**Working Directory**: `/Users/raghav/Desktop/GATE AG PREP WEB/.agents/teamwork_preview_explorer_m1_1/`  
**Target Milestone**: Milestone 1 — PWA Offline Capability (Focus: Web App Manifest & PWA Icon Assets)  
**Parent Agent ID**: `40aff111-8fba-4d8a-b8f1-1d042e97af41`  

---

## 1. Observation

### 1.1 Existing Codebase & Environment Analysis
1. **HTML & Metadata (`index.html:1-21`)**:
   - `index.html` currently contains a placeholder SVG data URI favicon:
     ```html
     <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg ...><path d='M12 2v20M2 12h20'/></svg>" />
     ```
   - Lacks `<link rel="manifest">`, `<meta name="theme-color">`, `<link rel="apple-touch-icon">`, and mobile web app capability tags.
2. **Public Directory (`public/`)**:
   - Contains: `docx_images/`, `downloads/`, `question_images/`, `question_snippets/`.
   - Missing: `public/icons/` directory, `public/manifest.webmanifest`, and `public/manifest.json`.
3. **App Styling & Identity (`src/components/Navbar.jsx:37-49`, `src/App.jsx:141`)**:
   - Primary Accent / Brand Color: `#2563EB` (Blue 600) with `#38BDF8` / `#60A5FA` highlights.
   - Dark Mode Background Canvas: `#0B0F19` (Dark Navy Slate).
   - Brand Text: **GATE AG** ("Agricultural Engineering Prep Portal").
4. **Vite Configuration & Base Path (`vite.config.js:7`)**:
   - `base: './'` is configured to allow relative asset resolution.
   - Vite automatically copies all files in `public/` directly to `dist/` preserving filenames and relative paths.
5. **Execution Runtime**:
   - Node.js version: `v24.14.0`.
   - Python version: `3.14.2` with `Pillow 12.3.0` installed and verified.

---

## 2. Logic Chain

1. **Manifest Specification (`manifest.webmanifest` & `manifest.json`)**:
   - **Observation**: Web App Manifest must adhere to the W3C Web App Manifest specification and support modern Chromium, Safari (iOS 16.4+ / macOS Sonoma+), Firefox, and Edge PWA installation standards.
   - **Deduction**: Both `public/manifest.webmanifest` (the standard MIME type `application/manifest+json`) and `public/manifest.json` (legacy Chromium/fallback alias) must be populated with identical, valid JSON.
   - **Fields**:
     - `theme_color`: `"#2563EB"` (matches primary UI theme).
     - `background_color`: `"#0B0F19"` (matches splash screen dark navy background).
     - `display`: `"standalone"` with `display_override: ["standalone", "window-controls-overlay", "minimal-ui"]`.
     - `start_url`: `"./"` and `scope`: `"./"` (ensures relative base path portability).
     - `shortcuts`: 3 quick actions mapped to `#practice`, `#mocktest`, and `#formulas`.
     - `icons`: References to 192x192, 512x512, 512x512 maskable, 180x180 apple-touch-icon, and SVG icon.

2. **Icon Asset Architecture (`public/icons/`)**:
   - **Observation**: Operating systems require specific icon sizes and safe-zone rules:
     - `icon-192.png`: 192x192 PNG for standard Android/Chrome home screens and task switchers.
     - `icon-512.png`: 512x512 PNG for high-DPI splash screens and install dialogs.
     - `icon-512-maskable.png`: 512x512 PNG designed with W3C maskable safe-zone (content scaled to inner 70-80% circle, allowing circular/squircle cropping without clipping text/graphics).
     - `apple-touch-icon.png`: 180x180 PNG with opaque background for iOS Safari home screen.
     - `icon.svg`: Scalable vector icon for high-resolution responsive browser tab favicon and UI rendering.
   - **Deduction**: Providing a deterministic Python script (`scripts/generate_pwa_icons.py`) utilizing Pillow supersampling (4x antialiasing via Lanczos resampling) and multi-platform system font fallbacks guarantees that all 5 image assets are generated error-free without missing files or external network dependencies.

3. **HTML Head Integration (`index.html`)**:
   - **Observation**: Browsers discover PWA capabilities through `<link rel="manifest">` and platform-specific meta tags.
   - **Deduction**: `index.html` must be updated with manifest link, dual theme-color tags (for light/dark preferences), Apple touch icon links, and standalone mobile app meta tags.

4. **URL Hash Navigation in Client (`src/App.jsx`)**:
   - **Observation**: PWA shortcuts specify `url: "./#practice"`, `"./#mocktest"`, and `"./#formulas"`.
   - **Deduction**: Initializing `activeTab` from `window.location.hash` allows shortcut clicks to navigate straight to the intended view on startup.

---

## 3. Caveats

1. **Maskable Icon Safe Zone**: Android adaptive icons apply circular, rounded square, or teardrop masks that discard the outer 10% on every edge. `icon-512-maskable.png` must keep all foreground text ("GATE", "AG") and glyphs within the central 80% circle (radius ~204px). The background fill `#0B0F19` extends fully to 512x512.
2. **Base Path Portability**: Because Vite is configured with `base: './'`, all icon and manifest references in `index.html` and the manifest itself use relative paths (`./icons/...`, `./manifest.webmanifest`, `./#practice`) so the PWA installs properly whether deployed at the root domain (`/`) or in subdirectories.
3. **MIME Types**: In production static servers, `.webmanifest` files should ideally be served with `Content-Type: application/manifest+json`. Having `manifest.json` alongside `manifest.webmanifest` ensures 100% compatibility with older servers and test scripts.

---

## 4. Conclusion & Implementation Artifacts

Below are the exact specifications, source code, and scripts ready for implementation by the Worker.

### 4.1 Specification for `public/manifest.webmanifest` & `public/manifest.json`

Create both `/Users/raghav/Desktop/GATE AG PREP WEB/public/manifest.webmanifest` and `/Users/raghav/Desktop/GATE AG PREP WEB/public/manifest.json` with the following content:

```json
{
  "id": "./",
  "name": "GATE AG Prep Portal | Agricultural Engineering PYQ CBT & Practice",
  "short_name": "GATE AG Prep",
  "description": "Comprehensive offline-capable preparation portal for GATE Agricultural Engineering (AG) featuring 2007-2026 PYQ CBT Mock Tests, Section-wise Practice Pool, and Formula Sheet.",
  "start_url": "./",
  "scope": "./",
  "display": "standalone",
  "display_override": [
    "standalone",
    "window-controls-overlay",
    "minimal-ui"
  ],
  "orientation": "any",
  "theme_color": "#2563EB",
  "background_color": "#0B0F19",
  "lang": "en",
  "dir": "ltr",
  "categories": [
    "education",
    "productivity",
    "utilities"
  ],
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "icons/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "icons/icon.svg",
      "sizes": "any",
      "type": "image/svg+xml",
      "purpose": "any"
    },
    {
      "src": "icons/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any"
    }
  ],
  "shortcuts": [
    {
      "name": "Practice Pool",
      "short_name": "Practice",
      "description": "Jump directly to 260+ topic-wise practice questions with instant solutions",
      "url": "./#practice",
      "icons": [
        {
          "src": "icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "PYQ Mock Tests",
      "short_name": "Mock Test",
      "description": "Attempt authentic 2007-2026 GATE AG Computer Based Tests",
      "url": "./#mocktest",
      "icons": [
        {
          "src": "icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ]
    },
    {
      "name": "Formula Revision Sheet",
      "short_name": "Formula Sheet",
      "description": "Review comprehensive mathematical and engineering formulas",
      "url": "./#formulas",
      "icons": [
        {
          "src": "icons/icon-192.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ]
    }
  ],
  "prefer_related_applications": false
}
```

---

### 4.2 Scalable Vector Icon (`public/icons/icon.svg`)

Create `/Users/raghav/Desktop/GATE AG PREP WEB/public/icons/icon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  
  <!-- Outer Glow Border -->
  <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="#2563EB" stroke-width="4" stroke-opacity="0.4" />
  <rect x="16" y="16" width="480" height="480" rx="96" fill="none" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.2" />

  <!-- Center Decorative Shield & Emblem -->
  <g transform="translate(256, 256)">
    <!-- Radial Glow Behind Logo -->
    <circle r="160" fill="#2563EB" opacity="0.15" filter="url(#glow)" />
    
    <!-- Outer Orbital Circuit Rings -->
    <circle r="180" fill="none" stroke="#3B82F6" stroke-width="2" stroke-opacity="0.25" stroke-dasharray="12 8" />
    <circle r="150" fill="none" stroke="#60A5FA" stroke-width="2.5" stroke-opacity="0.4" />
    
    <!-- Top Pill: GATE -->
    <g transform="translate(0, -115)">
      <rect x="-70" y="-22" width="140" height="44" rx="22" fill="url(#accentGrad)" filter="url(#glow)" />
      <text x="0" y="8" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" letter-spacing="4" text-anchor="middle">GATE</text>
    </g>

    <!-- Main AG Bold Monogram -->
    <text x="-4" y="58" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="148" font-weight="900" letter-spacing="-4" text-anchor="middle" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))">AG</text>

    <!-- Bottom Emblem: Agricultural Sprout / Golden Wheat Nodes -->
    <g transform="translate(0, 110)">
      <!-- Central Stem -->
      <path d="M0,25 C0,0 0,-15 0,-25" stroke="url(#greenGrad)" stroke-width="4" stroke-linecap="round" />
      <!-- Left Leaf -->
      <path d="M-2,-8 C-18,-18 -26,-2 -15,10 C-6,14 -2,5 -2,-8 Z" fill="url(#greenGrad)" />
      <!-- Right Leaf -->
      <path d="M2,-8 C18,-18 26,-2 15,10 C6,14 2,5 2,-8 Z" fill="url(#greenGrad)" />
      <!-- Top Bud / Wheat Seed -->
      <circle cx="0" cy="-28" r="5" fill="url(#goldGrad)" />
      <!-- Secondary Seeds -->
      <circle cx="-18" cy="-12" r="3.5" fill="url(#goldGrad)" />
      <circle cx="18" cy="-12" r="3.5" fill="url(#goldGrad)" />
    </g>

    <!-- Subtitle: PREPARATION PORTAL -->
    <text x="0" y="165" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" letter-spacing="6" text-anchor="middle">PREPARATION PORTAL</text>
  </g>
</svg>
```

---

### 4.3 Automated Icon Generation Script (`scripts/generate_pwa_icons.py`)

Create `/Users/raghav/Desktop/GATE AG PREP WEB/scripts/generate_pwa_icons.py`:

```python
#!/usr/bin/env python3
"""
PWA Icon Generator for GATE AG Prep Portal
Generates all required PNG assets and SVG vector icon in public/icons/
"""
import os
import math
from PIL import Image, ImageDraw, ImageFont

ICONS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')
os.makedirs(ICONS_DIR, exist_ok=True)

SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B82F6" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)" />
  <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="#2563EB" stroke-width="4" stroke-opacity="0.4" />
  <rect x="16" y="16" width="480" height="480" rx="96" fill="none" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.2" />
  <g transform="translate(256, 256)">
    <circle r="160" fill="#2563EB" opacity="0.15" filter="url(#glow)" />
    <circle r="180" fill="none" stroke="#3B82F6" stroke-width="2" stroke-opacity="0.25" stroke-dasharray="12 8" />
    <circle r="150" fill="none" stroke="#60A5FA" stroke-width="2.5" stroke-opacity="0.4" />
    <g transform="translate(0, -115)">
      <rect x="-70" y="-22" width="140" height="44" rx="22" fill="url(#accentGrad)" filter="url(#glow)" />
      <text x="0" y="8" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" letter-spacing="4" text-anchor="middle">GATE</text>
    </g>
    <text x="-4" y="58" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="148" font-weight="900" letter-spacing="-4" text-anchor="middle" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.6))">AG</text>
    <g transform="translate(0, 110)">
      <path d="M0,25 C0,0 0,-15 0,-25" stroke="url(#greenGrad)" stroke-width="4" stroke-linecap="round" />
      <path d="M-2,-8 C-18,-18 -26,-2 -15,10 C-6,14 -2,5 -2,-8 Z" fill="url(#greenGrad)" />
      <path d="M2,-8 C18,-18 26,-2 15,10 C6,14 2,5 2,-8 Z" fill="url(#greenGrad)" />
      <circle cx="0" cy="-28" r="5" fill="url(#goldGrad)" />
      <circle cx="-18" cy="-12" r="3.5" fill="url(#goldGrad)" />
      <circle cx="18" cy="-12" r="3.5" fill="url(#goldGrad)" />
    </g>
    <text x="0" y="165" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" letter-spacing="6" text-anchor="middle">PREPARATION PORTAL</text>
  </g>
</svg>'''

def get_best_font(size, is_bold=True):
    candidates = [
        '/System/Library/Fonts/Helvetica.ttc',
        '/System/Library/Fonts/SFPro.ttf',
        '/System/Library/Fonts/SFNSText.ttf',
        '/Library/Fonts/Arial.ttf',
        '/System/Library/Fonts/Supplemental/Arial Bold.ttf',
        '/System/Library/Fonts/Supplemental/Arial.ttf',
        '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',
        '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf',
        'C:\\Windows\\Fonts\\arialbd.ttf',
        'C:\\Windows\\Fonts\\arial.ttf'
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                idx = 1 if ('Helvetica' in path and is_bold) else 0
                return ImageFont.truetype(path, size, index=idx)
            except Exception:
                try:
                    return ImageFont.truetype(path, size)
                except Exception:
                    continue
    return ImageFont.load_default()

def render_png_icon(size, is_maskable=False):
    scale = 4
    canvas_size = size * scale
    img = Image.new('RGBA', (canvas_size, canvas_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    cx = canvas_size / 2.0
    cy = canvas_size / 2.0

    # Draw gradient background (#0B0F19 to #1E3A8A)
    for y in range(canvas_size):
        t = y / float(canvas_size)
        r = int(11 * (1.0 - t) + 30 * t)
        g = int(15 * (1.0 - t) + 58 * t)
        b = int(25 * (1.0 - t) + 138 * t)
        draw.line([(0, y), (canvas_size, y)], fill=(r, g, b, 255))

    # Maskable safe-zone: 70% scale; regular: 88% scale
    content_scale = 0.70 if is_maskable else 0.88

    # Border decoration
    if not is_maskable:
        inset = int(16 * (canvas_size / 512.0))
        rad = int(96 * (canvas_size / 512.0))
        draw.rounded_rectangle(
            [inset, inset, canvas_size - inset, canvas_size - inset],
            radius=rad,
            outline=(37, 99, 235, 160),
            width=int(3 * scale)
        )

    # Orbit rings
    r_outer = int(175 * (canvas_size / 512.0) * content_scale)
    draw.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], outline=(59, 130, 246, 90), width=int(2.5 * scale))
    
    r_inner = int(145 * (canvas_size / 512.0) * content_scale)
    draw.ellipse([cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner], outline=(96, 165, 250, 160), width=int(3.5 * scale))

    # Top GATE pill
    pill_w = int(140 * (canvas_size / 512.0) * content_scale)
    pill_h = int(46 * (canvas_size / 512.0) * content_scale)
    pill_y = cy - int(115 * (canvas_size / 512.0) * content_scale)
    pill_r = int(23 * (canvas_size / 512.0) * content_scale)
    
    draw.rounded_rectangle(
        [cx - pill_w/2.0, pill_y - pill_h/2.0, cx + pill_w/2.0, pill_y + pill_h/2.0],
        radius=pill_r,
        fill=(37, 99, 235, 255),
        outline=(96, 165, 250, 255),
        width=int(2 * scale)
    )

    font_gate = get_best_font(int(22 * (canvas_size / 512.0) * content_scale), is_bold=True)
    font_ag = get_best_font(int(148 * (canvas_size / 512.0) * content_scale), is_bold=True)
    font_sub = get_best_font(int(18 * (canvas_size / 512.0) * content_scale), is_bold=True)

    draw.text((cx, pill_y), 'GATE', fill=(255, 255, 255, 255), font=font_gate, anchor='mm')

    # Main AG Monogram
    ag_y = cy + int(12 * (canvas_size / 512.0) * content_scale)
    draw.text((cx + 3 * scale, ag_y + 5 * scale), 'AG', fill=(0, 0, 0, 160), font=font_ag, anchor='mm')
    draw.text((cx, ag_y), 'AG', fill=(255, 255, 255, 255), font=font_ag, anchor='mm')

    # Bottom Sprout / Leaves
    sprout_y = cy + int(105 * (canvas_size / 512.0) * content_scale)
    stem_len = int(35 * (canvas_size / 512.0) * content_scale)
    draw.line([(cx, sprout_y - stem_len/2.0), (cx, sprout_y + stem_len/2.0)], fill=(52, 211, 153, 255), width=int(4 * scale))
    
    # Golden seed bud
    seed_r = int(7 * (canvas_size / 512.0) * content_scale)
    seed_y = sprout_y - int(stem_len/2.0) - seed_r
    draw.ellipse([cx - seed_r, seed_y - seed_r, cx + seed_r, seed_y + seed_r], fill=(251, 191, 36, 255), outline=(217, 119, 6, 255), width=int(1.5 * scale))

    # Subtitle
    sub_y = cy + int(158 * (canvas_size / 512.0) * content_scale)
    draw.text((cx, sub_y), 'PREPARATION PORTAL', fill=(148, 163, 184, 255), font=font_sub, anchor='mm')

    return img.resize((size, size), Image.Resampling.LANCZOS)

def main():
    print("Generating PWA Icon Assets in public/icons/...")
    # 1. Write vector SVG icon
    svg_path = os.path.join(ICONS_DIR, 'icon.svg')
    with open(svg_path, 'w', encoding='utf-8') as f:
        f.write(SVG_CONTENT.strip())
    print(f"  ✓ Created {svg_path}")

    # 2. Generate PNG icons
    targets = [
        ('icon-192.png', 192, False),
        ('icon-512.png', 512, False),
        ('icon-512-maskable.png', 512, True),
        ('apple-touch-icon.png', 180, False)
    ]

    for name, size, is_maskable in targets:
        path = os.path.join(ICONS_DIR, name)
        img = render_png_icon(size, is_maskable=is_maskable)
        img.save(path, format='PNG', optimize=True)
        print(f"  ✓ Created {path} ({size}x{size})")

    print("All PWA Icon Assets successfully generated!")

if __name__ == '__main__':
    main()
```

---

### 4.4 HTML Head Modifications (`index.html`)

Update `index.html` to integrate the manifest, icons, theme colors, and mobile web app meta tags:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
    <title>GATE AG Prep Portal | Practice & PYQ CBT Portal</title>
    <meta name="description" content="GATE Agricultural Engineering (AG) Exam Practice Portal featuring 2007-2026 PYQ CBT Mock Tests, Section-wise Practice Pool, and Formula Sheet." />
    
    <!-- PWA & Mobile Web App Meta -->
    <meta name="theme-color" content="#2563EB" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0B0F19" media="(prefers-color-scheme: dark)" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="GATE AG" />
    <meta name="application-name" content="GATE AG Prep" />

    <!-- PWA Icons & Manifest -->
    <link rel="icon" type="image/svg+xml" href="./icons/icon.svg" />
    <link rel="icon" type="image/png" sizes="192x192" href="./icons/icon-192.png" />
    <link rel="apple-touch-icon" href="./icons/apple-touch-icon.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png" />
    <link rel="manifest" href="./manifest.webmanifest" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    <!-- KaTeX CSS for math formulas -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIsljEV4xM24pORrLz7voUtgMPH59vADqlj85549A7+46E7g4EO2gkgT8zJ4Q" crossorigin="anonymous">
  </head>
  <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen selection:bg-blue-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### 4.5 Client-side Hash Handling in `src/App.jsx`

In `src/App.jsx:19-25`, update the `activeTab` state initialization so shortcut URLs (`#practice`, `#mocktest`, `#formulas`) take effect immediately:

```jsx
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validTabs = ['dashboard', 'practice', 'mocktest', 'downloads', 'customtest', 'syllabus', 'formulas', 'revision', 'creator'];
      if (validTabs.includes(hash)) {
        return hash;
      }
    } catch (e) {
      // fallback
    }
    return 'dashboard';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      const validTabs = ['dashboard', 'practice', 'mocktest', 'downloads', 'customtest', 'syllabus', 'formulas', 'revision', 'creator'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
```

---

## 5. Verification Method

To independently verify the implementation, execute the following commands in the workspace root:

### 5.1 Verification Checklist & Commands

1. **Generate Icon Assets**:
   ```bash
   python3 scripts/generate_pwa_icons.py
   ```
   *Expected Result*: Output lines indicating creation of `icon.svg`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, and `apple-touch-icon.png`.

2. **Verify File Existence & Dimensions**:
   ```bash
   python3 -c "
   import os
   from PIL import Image
   import json

   assert os.path.exists('public/manifest.webmanifest'), 'manifest.webmanifest missing'
   assert os.path.exists('public/manifest.json'), 'manifest.json missing'
   
   with open('public/manifest.webmanifest') as f:
       m = json.load(f)
       assert m['name'] and m['short_name']
       assert m['start_url'] == './'
       assert m['display'] == 'standalone'
       assert m['theme_color'] == '#2563EB'
       assert m['background_color'] == '#0B0F19'
       assert len(m['icons']) >= 4
       assert len(m['shortcuts']) == 3

   icons = {
       'public/icons/icon-192.png': (192, 192),
       'public/icons/icon-512.png': (512, 512),
       'public/icons/icon-512-maskable.png': (512, 512),
       'public/icons/apple-touch-icon.png': (180, 180),
   }
   for path, (w, h) in icons.items():
       assert os.path.exists(path), f'{path} missing'
       im = Image.open(path)
       assert im.size == (w, h), f'{path} wrong size: {im.size} != {(w, h)}'
   
   assert os.path.exists('public/icons/icon.svg'), 'icon.svg missing'
   with open('public/icons/icon.svg') as f:
       assert '<svg' in f.read()

   print('ALL PWA ASSETS & MANIFEST VERIFICATIONS PASSED!')
   "
   ```

3. **Verify Production Build**:
   ```bash
   npm run build
   ```
   *Expected Result*: Build completes with exit code 0, and `dist/manifest.webmanifest`, `dist/manifest.json`, and `dist/icons/` are placed in `dist/`.

4. **Automated Test Runner Compatibility**:
   Ensure `tests/pwa.test.js` in Milestone 2 checks:
   - Valid JSON parsing of `manifest.webmanifest` and `manifest.json`.
   - Exact theme and background color `#2563EB` and `#0B0F19`.
   - Existence and dimensions of all 5 icon files in `public/icons/`.
