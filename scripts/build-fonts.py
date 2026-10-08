#!/usr/bin/env python3
"""Build public/fonts/*.woff2 from the Fontsource packages in node_modules.

    python3 -m venv /tmp/fonts && /tmp/fonts/bin/pip install fonttools brotli uharfbuzz
    /tmp/fonts/bin/python scripts/build-fonts.py . public/fonts
"""
import io
import os
import sys

import uharfbuzz as hb
from fontTools import subset
from fontTools.ttLib import TTFont


def load(source):
    # keep head.modified fixed, so a rebuild gives byte-identical files
    return TTFont(source, recalcTimestamp=False)


ROOT, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
NM = os.path.join(ROOT, 'node_modules')
YATRA = NM + '/@fontsource/yatra-one/files/yatra-one-%s-400-normal.woff2'
HIND = NM + '/@fontsource/hind/files/hind-%s-%s-normal.woff2'
TEKO = NM + '/@fontsource-variable/teko/files/teko-%s-wght-normal.woff2'

# Basic Latin, accented letters, NBSP, (c), middle dot, dashes, curly quotes, bullet, ellipsis
LATIN = (
    list(range(0x20, 0x7F))
    + [c for c in range(0xC0, 0x100) if c not in (0xD7, 0xF7)]
    + [0xA0, 0xA9, 0xB7, 0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026]
)
RUPEE = 0x20B9


def run_subset(font, unicodes):
    o = subset.Options()
    o.flavor, o.hinting, o.layout_features = 'woff2', False, ['*']
    o.notdef_outline, o.glyph_names, o.legacy_kern = True, False, False
    o.name_IDs, o.name_languages = [0, 1, 2, 3, 4, 5, 6, 13, 14], [0x409]  # keep copyright + licence
    s = subset.Subsetter(o)
    s.populate(unicodes=unicodes)
    s.subset(font)
    return font


def write(font, name):
    font.flavor = 'woff2'
    path = os.path.join(OUT, name)
    font.save(path)
    print(f'{name:28} {os.path.getsize(path):6} bytes')
    return path


def ttf_bytes(font):
    b = io.BytesIO()
    font.flavor = None
    font.save(b)
    return b.getvalue()


def with_rupee(latin_path, ext_path):
    """Latin subset plus the rupee glyph copied in from the latin-ext file."""
    dst = run_subset(load(latin_path), LATIN)
    dst.flavor = None
    src = run_subset(load(ext_path), [RUPEE])
    src.flavor = None
    name = src.getBestCmap()[RUPEE]
    order = dst.getGlyphOrder() + [name]
    dst.setGlyphOrder(order)
    dst['glyf'].glyphOrder = order
    dst['glyf'].glyphs[name] = src['glyf'][name]  # a single plain outline
    dst['hmtx'].metrics[name] = src['hmtx'].metrics[name]
    for t in dst['cmap'].tables:
        if t.isUnicode():
            t.cmap[RUPEE] = name
    dst['maxp'].numGlyphs = len(order)
    return load(io.BytesIO(ttf_bytes(dst)))  # round-trip to rebuild the tables


# Latin faces (the rupee comes from latin-ext; Teko's variable rupee stays a separate face)
write(with_rupee(YATRA % 'latin', YATRA % 'latin-ext'), 'yatra-one-latin.woff2')
for w in (400, 600):
    write(with_rupee(HIND % ('latin', w), HIND % ('latin-ext', w)), f'hind-{w}.woff2')
write(run_subset(load(TEKO % 'latin'), LATIN), 'teko-latin.woff2')
write(run_subset(load(TEKO % 'latin-ext'), [RUPEE]), 'teko-rupee.woff2')

# Yatra One Devanagari: the whole block (letters, matras, virama, nukta, danda, digits),
# ZWJ/ZWNJ, with half forms, reph and below-base forms. Of the 378 stacked-conjunct
# ligatures (GSUB `pres`) keep only those used by common Hindi words and conjuncts;
# any other conjunct still shapes, with half forms.
SAMPLES = """
क्क क्त क्र क्ल क्व क्स क्य क्ष ख्य ग्न ग्र ग्ल ग्य ग्व घ्न घ्र ङ्क ङ्ग च्च च्छ च्य ज्ज ज्य ज्र ज्व ज्ञ ञ्च ञ्ज
ट्ट ट्ठ ट्य ट्र ड्ड ड्ढ ड्य ड्र ढ्र ण्ट ण्ठ ण्ड ण्ण ण्य त्क त्त त्न त्प त्म त्य त्र त्व त्स थ्य
द्ग द्घ द्द द्ध द्न द्ब द्भ द्म द्य द्र द्व ध्न ध्म ध्य ध्र ध्व न्क न्त न्द न्ध न्न न्प न्म न्य न्र न्व न्स न्ह
प्त प्न प्प प्य प्र प्ल प्स ब्ज ब्द ब्ध ब्न ब्ब ब्य ब्र ब्व भ्य भ्र म्न म्प म्ब म्भ म्म म्य म्र म्ल म्व
य्य ल्क ल्प ल्ल ल्य ल्व व्य व्र व्व श्च श्न श्म श्य श्र श्ल श्व ष्क ष्ट ष्ठ ष्ण ष्प ष्म ष्य
स्क स्ख स्त स्न स्थ स्प स्फ स्म स्य स्र स्व स्स ह्म ह्य ह्र ह्ल ह्व ह्न ह्ण स्त्र न्त्र न्द्र ष्ट्र क्ष्म क्ष्य त्त्व क्त्र
24 घंटे खुला चौबीस घंटे खुला विद्यार्थी द्वार ट्रेन ब्रेड ड्राइव क्रीम ग्रेवी प्रसाद स्वादिष्ट स्वागत
गरमागरम ताज़ा पनीर मोमो नूडल्स मंचूरियन आइसक्रीम सैंडविच शेक रोल कॉफ़ी ऑर्डर डिलीवरी होम डिलीवरी
ख़ाना ज़रूर फ़्राइड राइस चाऊमीन चिल्ली पोटैटो रेस्टोरेंट इंदिरापुरम गाज़ियाबाद उत्तर प्रदेश
१२३४५६७८९० ।॥ हिन्दी संस्कृति कृपया पुनः मुँह नमस्ते शुक्रिया धन्यवाद आपका स्वागत है
""".split()


def shape(data, text):
    font = hb.Font(hb.Face(hb.Blob(data)))
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {})
    return [font.glyph_to_string(i.codepoint) for i in buf.glyph_infos], sum(p.x_advance for p in buf.glyph_positions)


full = load(YATRA % 'devanagari')
full_bytes = ttf_bytes(full)
pres = full['GSUB'].table.LookupList.Lookup[14]  # the conjunct ligatures
all_pres = {lg.LigGlyph for st in pres.SubTable for ligs in st.ligatures.values() for lg in ligs}
keep = {g for text in SAMPLES for g in shape(full_bytes, text)[0] if g in all_pres}
print(f'stacked conjuncts kept: {len(keep)} of {len(all_pres)}')

t = load(io.BytesIO(full_bytes))
st = t['GSUB'].table.LookupList.Lookup[14].SubTable[0]
for first, ligs in list(st.ligatures.items()):
    kept = [lg for lg in ligs if lg.LigGlyph in keep]
    if kept:
        st.ligatures[first] = kept
    else:
        del st.ligatures[first]
cps = [c for c in full.getBestCmap() if 0x900 <= c <= 0x97F] + [0x20, 0xA0, 0x200C, 0x200D, 0x25CC]
path = write(run_subset(t, cps), 'yatra-one-devanagari.woff2')

# Check: every sample shapes exactly like the full font
sub_bytes = ttf_bytes(load(path))
bad = [s for s in SAMPLES if shape(full_bytes, s)[1] != shape(sub_bytes, s)[1]]
print('samples shaping differently from the full font:', len(bad), bad[:5])
