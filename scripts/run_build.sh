#!/usr/bin/env bash
# Linux platform bash file
echo "author godcheese"
CURRENT_DIR=$(pwd)
SCRIPTS_DIR=$(cd "$(dirname $0)" || exit; pwd)
cd "${SCRIPTS_DIR}" || exit
cd ..
npm run serve
npm run build
cd "${CURRENT_DIR}" || exit
