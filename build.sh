#!/usr/bin/env bash
./node_modules/uglify-js/bin/uglifyjs src.js -c -m -o index.js
echo 'Build started!'
exit 0