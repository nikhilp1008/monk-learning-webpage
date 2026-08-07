import json

d = json.load(open('scratch/math3/all_sections.json'))
d.sort(key=lambda s: s['position'])

NEEDLE1 = "\\u2014"  # literal backslash + u2014 (6 chars)
NEEDLE2 = "\\u2013"

def count_bug(obj):
    n = 0
    if isinstance(obj, str):
        n += obj.count(NEEDLE1) + obj.count(NEEDLE2)
    elif isinstance(obj, list):
        for v in obj:
            n += count_bug(v)
    elif isinstance(obj, dict):
        for v in obj.values():
            n += count_bug(v)
    return n

total = 0
for s in d:
    for field in ["board_content", "segments_english", "segments_hinglish"]:
        n = count_bug(s.get(field))
        if n:
            print("sec", s["position"], field, n)
            total += n
print("TOTAL OCCURRENCES:", total)
