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
