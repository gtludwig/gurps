#! /usr/local/bin/node
import fs from 'fs'
import path from 'path'
import { spawnSync } from 'child_process'

let dir = path.resolve(process.env._)
dir = dir.substr(0, dir.lastIndexOf('/'))
console.log(dir)

function uint8arrayToString(myUint8Arr) {
  return String.fromCharCode.apply(null, myUint8Arr)
}

let script = dir + '/find-missing-keys.js'
let outfile = dir + '/orphans.txt'
const child = spawnSync(script, ['templates', 'module', 'lib'])
console.error(uint8arrayToString(child.stderr))
let output = uint8arrayToString(child.stdout)
console.log(output)
fs.writeFileSync(outfile, output)

let langs = ['de', 'pt_br', 'ru']
script = dir + '/json-key-diff.js'
langs.forEach(lang => {
  const outfile = `utils/diff-en-${lang}.txt`
  const child = spawnSync(script, ['lang/en.json', `lang/${lang}.json`])
  console.error(uint8arrayToString(child.stderr))
  const output = uint8arrayToString(child.stdout)
  console.log(output)
  fs.writeFileSync(outfile, output)
})
