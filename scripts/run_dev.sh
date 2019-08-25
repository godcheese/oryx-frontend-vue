#!/usr/bin/env bash
echo "author godcheese"
CURRENT_DIR=$(pwd)
SCRIPTS_DIR=$(cd "$(dirname $0)" || exit; pwd)
cd "${SCRIPTS_DIR}" || exit
cd ..
npm run serve
cd "${CURRENT_DIR}" || exit
