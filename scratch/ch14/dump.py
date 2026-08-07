import json, sys

d = json.load(open('/Users/nikhi/Downloads/monk-scenes-math14/scratch/ch14/all_sections.json'))
d.sort(key=lambda r: r['position'])

def dump_section(s):
    out = []
    out.append(f"=== Sec {s['position']} [{s['section_type']}] {s['title']} ===")
    out.append(f"subtopic: {s['subtopic']}")
    out.append(f"reveals_en: {s['board_reveal_at_english']}")
    out.append(f"reveals_hi: {s['board_reveal_at_hinglish']}")
    out.append(f"dur_en: {s['duration_sec_english']}  dur_hi: {s['duration_sec_hinglish']}")
    out.append("")
    out.append("-- board_content --")
    for b in s['board_content']:
        seq = b.get('seq')
        typ = b.get('type', '?')
        ra = b.get('reveal_at')
        if typ == 'formula':
            content = f"LATEX: {b.get('latex')}"
        elif 'svg' in b:
            content = f"SVG (len={len(b['svg'])}): {b['svg'][:400]}"
        else:
            content = b.get('text', '')
        style = b.get('style', '')
        emph = b.get('emphasis', '')
        out.append(f"  [{seq}] @{ra}s type={typ} style={style} emph={emph}: {content}")
    out.append("")
    out.append("-- narration (english) --")
    for seg in s['segments_english']:
        out.append(f"  [{seg['seq']}] {seg['text']}")
    return "\n".join(out)

if __name__ == '__main__':
    pos = int(sys.argv[1])
    s = next(r for r in d if r['position'] == pos)
    print(dump_section(s))
