#!/bin/zsh
# Self-healing git commit for iCloud-evicted objects: usage ./commit-heal.sh "<msg>" <files...>
msg="$1"; shift
git add "$@" || exit 1
for i in {1..25}; do
  out=$(git commit -q -m "$msg" 2>&1) && { echo "COMMIT OK"; exit 0; }
  p=$(printf '%s' "$out" | grep -o "for '[^']*'" | head -1 | cut -d"'" -f2)
  [ -z "$p" ] && { echo "OTHER ERROR: $out"; exit 1; }
  cat "$p" >/dev/null 2>&1
  git hash-object -w "$p" >/dev/null && echo "restored $p"
done
echo "GAVE UP"; exit 1
