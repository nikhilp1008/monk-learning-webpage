import json, sys, re
with open('scratch/math8-all.json') as f:
    d = json.load(f)
def clean_svg(s):
    return s[:80] + "...SVG..." if len(s) > 80 else s
for p in sys.argv[1:]:
    s = d[p]
    print(f"=== SEC {p}: {s['title']}  [{s['section_type']}] subtopic={s['subtopic']} ===")
    print("REVEALS_EN:", s['board_reveal_at_english'])
    print("REVEALS_HI:", s['board_reveal_at_hinglish'])
    for i, b in enumerate(s['board_content']):
        typ = b.get('type')
        if typ == 'diagram':
            content = clean_svg(b.get('svg',''))
            extra = f" caption={b.get('caption')!r}"
        elif typ == 'formula':
            content = b.get('latex','')
            extra = ""
        else:
            content = b.get('text','')
            extra = f" style={b.get('style')}" if b.get('style') else ""
        print(f"  [{i}] ({typ}{extra}): {content}")
    print()
