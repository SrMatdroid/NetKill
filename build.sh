#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"
cd module

VERSION="$(sed -n 's/^version=//p' module.prop)"
ID="$(sed -n 's/^id=//p' module.prop)"
OUT="../${ID}-${VERSION}.zip"

rm -f "$OUT"
zip -r9 "$OUT" . \
    -x '*.DS_Store' -x '__MACOSX/*' -x '*.git*'

echo
echo "ZIP listo: $(readlink -f "$OUT")"
unzip -l "$OUT"
