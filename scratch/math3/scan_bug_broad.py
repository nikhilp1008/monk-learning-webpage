import json
import re

d = json.load(open('scratch/math3/all_sections.json'))
d.sort(key=lambda s: s['position'])

PATTERN = re.compile(r'\\u[0-9a-fA-F]{4}')

def find_bug(obj, path=''):
    hits = []
    if isinstance(obj, str):
        for m in PATTERN.finditer(obj):
            hits.append((path, m.group(0), obj))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            hits += find_bug(v, f'{path}[{i}]')
    elif isinstance(obj, dict):
        for k, v in obj.items():
            hits += find_bug(v, f'{path}.{k}')
    return hits

total = 0
for s in d:
    for field in ['board_content', 'segments_english', 'segments_hinglish']:
        hits = find_bug(s.get(field), field)
        if hits:
            total += len(hits)
            print(f'sec {s["position"]}:')
            for path, code, text in hits:
                print(f'   {path} -> {code} in: {text[:90]}')
print('TOTAL:', total)
