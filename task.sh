#!/usr/bin/env sh
set -eu

# Thanks to https://github.com/adriancooney/Taskfile
# Protip: run `alias t=./task.sh` or something like that

PATH=./node_modules/.bin:$PATH

build () {
  esbuild ./src/main.ts --bundle --format=esm --tree-shaking=true --target=es2023 --outfile=./dist/script.mjs
}

serve () {
  miniserve -v --index index.html .
}

open () {
  start "http://[::1]:8080"
}

help () {
  echo "Available functions:"
  compgen -A function
}

echo "--- ${1:-build} ---"
eval "${@:-build}"