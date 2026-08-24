#!/usr/bin/env python3
"""Generate the Tegelweg house-papers asset library.

Sources: scans of the original 1976 planning submission for Tegelweg 4,
Wien XXII (16 PDFs supplied by Petrina; raster images inside PDF pages).
This script extracts each embedded scan, straightens it to reading
orientation, removes the 1976 owners' names (alpha-zeroed in line assets,
healed with the estimated paper background in color assets), recolors the
linework to Dotto brown and Dotto blue, and writes an organized library of
reusable assets. See assets/tegelweg-papers/README.md for the catalogue
and rules.

Usage:
    pip install pymupdf pillow numpy
    UPLOADS_DIR=/path/to/pdfs python3 scripts/tegelweg_papers.py
    python3 scripts/tegelweg_papers.py --from-existing

The uploaded source PDFs are intentionally not committed (they contain
unredacted personal names). Keep them in private storage; any regeneration
needs UPLOADS_DIR pointed at them. `--from-existing` recolors committed
brown line assets to blue without the PDFs.
"""

import os
import sys

from PIL import Image, ImageFilter

try:
    import numpy as np
    import pymupdf
except ImportError:
    np = None
    pymupdf = None

UPLOADS = os.environ.get(
    "UPLOADS_DIR", "/home/ubuntu/.cursor/projects/workspace/uploads"
)
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "tegelweg-papers")

CREAM = (249, 243, 240)
BROWN = (99, 59, 47)
BLUE = (69, 81, 159)  # --dotto-blue

# Working frame for every box below: AFTER rotation, full uncropped sheet.
# rotate is CCW degrees (PIL convention). redact boxes are (x0, y0, x1, y1).
SHEETS = {
    "neu-erdgeschoss": {
        "src": "F._Neu_Erdgeschoss_eeb8.pdf",
        "rotate": 0,
        "crop": (30, 5, 1670, 2035),
        "redact": [],
    },
    "neu-obergeschoss": {
        "src": "G._Neu_Obergeschoss_9f62.pdf",
        "rotate": 0,
        "crop": (20, 60, 1660, 1710),
        "redact": [],
    },
    "neu-mansarde": {
        "src": "H._Neu_Mansarde_0e31.pdf",
        "rotate": 0,
        "crop": (30, 30, 1300, 1420),
        "redact": [],
    },
    "neu-keller": {
        "src": "E._Neu_Keller_d706.pdf",
        "rotate": 0,
        "crop": (40, 300, 1620, 1780),
        "redact": [],
    },
    "alt-erdgeschoss": {
        "src": "C._Alt_Erdgeschoss_7050.pdf",
        "rotate": 90,
        "crop": (25, 30, 2290, 1640),
        "redact": [],
    },
    "alt-obergeschoss": {
        "src": "D._Alt_Obergeschoss_0478.pdf",
        "rotate": 90,
        "crop": (20, 20, 1600, 1650),
        "redact": [],
    },
    "alt-keller": {
        # Owner names, signatures, and builder stamp live in the band at
        # rotated x < 640 (the sheet's attached title strip). Cropped out
        # entirely AND alpha-zeroed in case the crop ever widens. The color
        # heal zone is narrower so the revenue stamps (no personal data)
        # stay harvestable as an object.
        "src": "B._Alt_Keller_3045.pdf",
        "rotate": 90,
        "crop": (660, 20, 2300, 1660),
        "redact": [(0, 0, 660, 1672)],
        "heal": [(0, 1000, 640, 1610)],
        "tinted": True,
    },
    "schnitt-a-b": {
        # Client block: five lines with the 1976 owners' names and home
        # address. The project title lines above them stay.
        "src": "2026-06-10_4._Tegelweg_Section_-_A-B_c771.pdf",
        "rotate": 90,
        "crop": (40, 20, 2290, 1660),
        "redact": [(0, 1300, 840, 1630)],
        "tinted": True,
    },
    "schnitt-c-d": {
        "src": "2026-06-10_5._Tegelweg_Section_-_C-D_6a47.pdf",
        "rotate": 90,
        "crop": (60, 180, 1600, 1420),
        "redact": [],
        "tinted": True,
        "floor": 0.10,
    },
    "strassenansicht": {
        "src": "2026-06-10_6._Tegelweg_Elevation_-_Front_a55c.pdf",
        "rotate": 90,
        "crop": (30, 60, 1800, 1620),
        "redact": [],
        "floor": 0.10,
    },
    "hofansicht": {
        # Bottom-left carries bleed-through of handwriting from the reverse
        # side (potentially names) — alpha-zeroed.
        "src": "2026-06-10_7._Tegelweg_Elevation_-_Back_a1d9.pdf",
        "rotate": 90,
        "crop": (60, 180, 1650, 1270),
        "redact": [(0, 1150, 700, 1560)],
        "floor": 0.12,
    },
    "bereiche": {
        # Two lines naming the 1976 owners; "MASSTAB 1:100" below stays.
        "src": "A._Alt_Bereiche_5def.pdf",
        "rotate": 0,
        "crop": (25, 30, 1670, 2300),
        "redact": [(0, 1392, 820, 1550)],
        "tinted": True,
    },
}

# (sheet, name, box in the rotated FULL-SHEET frame)
DETAILS = [
    ("strassenansicht", "haus", (40, 340, 1710, 1390)),
    ("strassenansicht", "fassade-notiz", (240, 1250, 1120, 1375)),
    ("hofansicht", "haus", (160, 355, 1555, 1210)),
    ("schnitt-a-b", "schnitt", (860, 190, 2090, 1540)),
    ("schnitt-a-b", "flaechen-tabelle", (75, 150, 820, 715)),
    ("schnitt-a-b", "titel-block", (55, 900, 825, 1318)),
    ("schnitt-c-d", "schnitt", (160, 355, 1370, 1330)),
    ("bereiche", "flaechen-tabelle", (65, 275, 810, 735)),
    ("bereiche", "titel-block", (60, 1160, 785, 1412)),
    ("bereiche", "masstab", (70, 1538, 435, 1618)),
    ("bereiche", "keller-mini", (1060, 1900, 1670, 2310)),
    ("neu-erdgeschoss", "plan", (115, 555, 1490, 1975)),
    ("neu-erdgeschoss", "stiege", (205, 1300, 445, 1560)),
    ("neu-erdgeschoss", "bad", (390, 840, 630, 1090)),
    ("neu-erdgeschoss", "terrasse", (580, 670, 900, 780)),
    ("neu-obergeschoss", "plan", (85, 245, 1565, 1505)),
    ("neu-obergeschoss", "balkon", (635, 420, 975, 500)),
    ("neu-mansarde", "plan", (105, 285, 1055, 1175)),
    ("neu-keller", "plan", (90, 440, 1555, 1720)),
    ("alt-erdgeschoss", "plan", (25, 470, 1545, 1515)),
    ("alt-obergeschoss", "plan", (70, 185, 1555, 1365)),
    ("alt-keller", "plan", (680, 175, 2205, 1635)),
]

WORDS = [
    ("strassenansicht", "strassenansicht", (245, 225, 905, 340)),
    ("hofansicht", "hofansicht", (240, 220, 705, 310)),
    ("schnitt-a-b", "schnitt-a-b", (1065, 90, 1550, 200)),
    ("schnitt-c-d", "schnitt-c-d", (235, 215, 715, 315)),
    ("neu-erdgeschoss", "erdgeschoss", (185, 440, 640, 520)),
    ("neu-erdgeschoss", "fassade-dolomit", (155, 0, 1030, 120)),
    ("neu-obergeschoss", "obergeschoss", (200, 143, 720, 230)),
    ("neu-obergeschoss", "zentral-beheizt", (0, 1640, 515, 1705)),
    ("neu-mansarde", "mansarde", (365, 60, 820, 170)),
    ("neu-mansarde", "dachfenster", (590, 1280, 970, 1385)),
    ("neu-keller", "keller", (290, 335, 570, 410)),
    ("alt-erdgeschoss", "erdgeschoss-alt", (245, 85, 700, 160)),
    ("alt-obergeschoss", "erster-stock", (195, 55, 545, 145)),
    ("alt-obergeschoss", "zentral-beheizt-alt", (70, 1565, 530, 1635)),
    ("alt-keller", "keller-alt", (905, 60, 1145, 140)),
]

# Color crops kept as documents (original paper). Frame: rotated full sheet.
OBJECTS = [
    ("bereiche", "stempelmarken", (235, 1855, 745, 2205)),
    ("bereiche", "flaechen-tabelle-papier", (55, 265, 820, 745)),
    ("alt-keller", "stempelmarken-keller", (60, 230, 530, 580)),
    ("schnitt-a-b", "titel-block-papier", (45, 890, 835, 1330)),
]

# Composed, post-ready tiles. (name, size, rows) where each row is
# (kind, sheet, box, target_width) stacked vertically with even spacing.
SOCIAL = [
    (
        "square-strassenansicht",
        (1080, 1080),
        [
            ("line", "strassenansicht", (245, 225, 905, 340), 500),
            ("line", "strassenansicht", (40, 340, 1710, 1390), 940),
        ],
    ),
    (
        "square-mansarde",
        (1080, 1080),
        [
            ("line", "neu-mansarde", (365, 60, 820, 170), 420),
            ("line", "neu-mansarde", (105, 285, 1055, 1175), 760),
        ],
    ),
    (
        "square-stempelmarken",
        (1080, 1080),
        [("color", "bereiche", (235, 1855, 745, 2205), 640)],
    ),
    (
        "portrait-neu-erdgeschoss",
        (1080, 1350),
        [
            ("line", "neu-erdgeschoss", (185, 440, 640, 520), 460),
            ("line", "neu-erdgeschoss", (115, 555, 1490, 1975), 860),
        ],
    ),
    (
        "portrait-schnitt-a-b",
        (1080, 1350),
        [
            ("line", "schnitt-a-b", (1065, 90, 1550, 200), 460),
            ("tinted", "schnitt-a-b", (860, 190, 2090, 1540), 940),
        ],
    ),
    (
        "story-hofansicht",
        (1080, 1920),
        [
            ("line", "hofansicht", (240, 220, 705, 310), 460),
            ("line", "hofansicht", (160, 355, 1555, 1210), 940),
        ],
    ),
    (
        "story-strassenansicht",
        (1080, 1920),
        [
            ("line", "strassenansicht", (245, 225, 905, 340), 500),
            ("line", "strassenansicht", (40, 340, 1710, 1240), 940),
            ("line", "strassenansicht", (240, 1250, 1120, 1375), 620),
        ],
    ),
    (
        "square-flaechen-tabelle",
        (1080, 1080),
        [("color", "bereiche", (55, 265, 820, 745), 820)],
    ),
]


def load_sheet(cfg):
    if pymupdf is None:
        raise RuntimeError("pymupdf is required to regenerate from source PDFs")
    doc = pymupdf.open(os.path.join(UPLOADS, cfg["src"]))
    xref = doc[0].get_images(full=True)[0][0]
    pix = pymupdf.Pixmap(doc, xref)
    if pix.colorspace and pix.colorspace.n > 3:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    doc.close()
    if cfg["rotate"]:
        img = img.rotate(cfg["rotate"], expand=True)
    return img


def background(gray, blur=61):
    return gray.filter(ImageFilter.GaussianBlur(blur))


def line_alpha(gray, gain=2.6, floor=0.08):
    bg = np.maximum(np.asarray(background(gray)).astype(np.float32), 1.0)
    norm = np.clip(np.asarray(gray).astype(np.float32) / bg, 0.0, 1.5)
    return np.clip(((1.0 - norm) - floor) * gain / (1.0 - floor), 0.0, 1.0)


def zero_boxes(alpha, boxes):
    for x0, y0, x1, y1 in boxes:
        alpha[y0:y1, x0:x1] = 0.0
    return alpha


def heal_boxes(img, boxes, blur=61):
    """Replace box contents with the blurred paper estimate (healing brush)."""
    if not boxes:
        return img
    healed = np.asarray(img).astype(np.float32)
    bg = np.asarray(img.filter(ImageFilter.GaussianBlur(blur))).astype(np.float32)
    h, w = healed.shape[:2]
    mask = np.zeros((h, w), dtype=np.float32)
    for x0, y0, x1, y1 in boxes:
        mask[y0:y1, x0:x1] = 1.0
    mask = np.asarray(
        Image.fromarray((mask * 255).astype(np.uint8)).filter(
            ImageFilter.GaussianBlur(9)
        )
    ).astype(np.float32)[..., None] / 255.0
    noise = np.random.default_rng(7).normal(0.0, 1.6, healed.shape).astype(np.float32)
    return Image.fromarray(
        np.clip(healed * (1 - mask) + (bg + noise) * mask, 0, 255).astype(np.uint8)
    )


def line_rgba(sheet_img, cfg):
    gray = sheet_img.convert("L")
    alpha = line_alpha(gray, floor=cfg.get("floor", 0.08))
    alpha = zero_boxes(alpha, cfg.get("redact", []))
    h, w = alpha.shape
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[:, :, :3] = BROWN
    rgba[:, :, 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(rgba)


def recolor_line(img, rgb=BLUE):
    """Replace baked line RGB, keep the extracted alpha."""
    rgba = img.convert("RGBA")
    color = Image.new("RGBA", rgba.size, rgb + (255,))
    color.putalpha(rgba.getchannel("A"))
    return color


def tinted_rgba(sheet_img, cfg):
    """Line extraction that keeps the original ink hues (color tints)."""
    gray = sheet_img.convert("L")
    alpha = line_alpha(gray, floor=cfg.get("floor", 0.08))
    alpha = zero_boxes(alpha, cfg.get("redact", []))
    rgb = np.asarray(sheet_img).astype(np.float32)
    bg = np.asarray(
        sheet_img.filter(ImageFilter.GaussianBlur(61))
    ).astype(np.float32)
    ratio = np.clip(rgb / np.maximum(bg, 1.0), 0.0, 1.0)
    out = np.zeros((*alpha.shape, 4), dtype=np.uint8)
    out[:, :, :3] = (ratio * 255).astype(np.uint8)
    out[:, :, 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(out)


def on_cream(rgba):
    base = Image.new("RGBA", rgba.size, CREAM + (255,))
    base.alpha_composite(rgba)
    return base.convert("RGB")


def save_webp(img, path, lossless=False):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    if lossless:
        img.save(path, "WEBP", lossless=True, quality=100, method=6)
    else:
        img.save(path, "WEBP", quality=90, method=6)


def main():
    if np is None or pymupdf is None:
        raise RuntimeError("pymupdf and numpy are required to regenerate from source PDFs")
    rendered = {}
    for key, cfg in SHEETS.items():
        sheet = load_sheet(cfg)
        line = line_rgba(sheet, cfg)
        blue = recolor_line(line)
        rendered[key] = {"sheet": sheet, "line": line, "blue": blue, "cfg": cfg}

        crop = cfg["crop"]
        save_webp(line.crop(crop), f"{OUT}/full/{key}-line.webp", lossless=True)
        save_webp(blue.crop(crop), f"{OUT}/full/{key}-line-blue.webp", lossless=True)
        save_webp(on_cream(line.crop(crop)), f"{OUT}/full/{key}-cream.webp")
        if cfg.get("tinted"):
            tinted = tinted_rgba(sheet, cfg)
            save_webp(tinted.crop(crop), f"{OUT}/full/{key}-tinted.webp", lossless=True)
            rendered[key]["tinted"] = tinted
        print("full:", key)

    for sheet_key, name, box in DETAILS:
        line = rendered[sheet_key]["line"].crop(box)
        blue = rendered[sheet_key]["blue"].crop(box)
        save_webp(line, f"{OUT}/details/{sheet_key}--{name}-line.webp", lossless=True)
        save_webp(blue, f"{OUT}/details/{sheet_key}--{name}-line-blue.webp", lossless=True)
        save_webp(on_cream(line), f"{OUT}/details/{sheet_key}--{name}-cream.webp")
    print("details:", len(DETAILS))

    for sheet_key, name, box in WORDS:
        line = rendered[sheet_key]["line"].crop(box)
        blue = rendered[sheet_key]["blue"].crop(box)
        save_webp(line, f"{OUT}/words/{name}-line.webp", lossless=True)
        save_webp(blue, f"{OUT}/words/{name}-line-blue.webp", lossless=True)
        save_webp(on_cream(line), f"{OUT}/words/{name}-cream.webp")
    print("words:", len(WORDS))

    for sheet_key, name, box in OBJECTS:
        cfg = rendered[sheet_key]["cfg"]
        healed = heal_boxes(
            rendered[sheet_key]["sheet"], cfg.get("heal", cfg.get("redact", []))
        )
        save_webp(healed.crop(box), f"{OUT}/objects/{name}.webp")
    print("objects:", len(OBJECTS))

    for name, size, rows in SOCIAL:
        tile = Image.new("RGBA", size, CREAM + (255,))
        pieces = []
        for kind, sheet_key, box, target_w in rows:
            if kind == "color":
                cfg = rendered[sheet_key]["cfg"]
                src = heal_boxes(
                    rendered[sheet_key]["sheet"],
                    cfg.get("heal", cfg.get("redact", [])),
                ).crop(box).convert("RGBA")
            elif kind == "tinted":
                src = rendered[sheet_key]["tinted"].crop(box)
            else:
                src = rendered[sheet_key]["line"].crop(box)
            ratio = target_w / src.width
            pieces.append(
                src.resize((target_w, int(src.height * ratio)), Image.LANCZOS)
            )
        total_h = sum(p.height for p in pieces)
        gap = max((size[1] - total_h) // (len(pieces) + 1), 20)
        y = max((size[1] - total_h - gap * (len(pieces) - 1)) // 2, 30)
        for p in pieces:
            tile.alpha_composite(p, ((size[0] - p.width) // 2, y))
            y += p.height + gap
        save_webp(tile.convert("RGB"), f"{OUT}/social/{name}.webp")
    print("social:", len(SOCIAL))


def recolor_existing():
    """Recolor committed line assets to Dotto blue. Keeps brown originals."""
    repo = os.path.join(os.path.dirname(__file__), "..")
    library = os.path.join(repo, "assets", "tegelweg-papers")
    public = os.path.join(repo, "public", "papers")
    count = 0

    for folder in ("full", "details", "words"):
        folder_path = os.path.join(library, folder)
        for name in os.listdir(folder_path):
            if not name.endswith("-line.webp"):
                continue
            src = os.path.join(folder_path, name)
            dest_name = name.replace("-line.webp", "-line-blue.webp")
            dest = os.path.join(folder_path, dest_name)
            img = Image.open(src)
            save_webp(recolor_line(img), dest, lossless=True)
            count += 1
            print("library:", os.path.relpath(dest, repo), flush=True)

    for dirpath, dirnames, filenames in os.walk(public):
        dirnames[:] = [d for d in dirnames if d != "blue"]
        rel = os.path.relpath(dirpath, public)
        for name in filenames:
            if not name.endswith(".webp"):
                continue
            src = os.path.join(dirpath, name)
            img = Image.open(src)
            if "A" not in img.getbands():
                continue
            dest_dir = (
                os.path.join(public, "blue")
                if rel == "."
                else os.path.join(public, "blue", rel)
            )
            dest = os.path.join(dest_dir, name)
            save_webp(recolor_line(img), dest, lossless=True)
            count += 1
            print("public:", os.path.relpath(dest, repo), flush=True)

    print("recolored:", count)


if __name__ == "__main__":
    if "--from-existing" in sys.argv:
        recolor_existing()
    else:
        main()
