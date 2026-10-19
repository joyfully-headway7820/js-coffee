import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const iconsDir = path.join(path.dirname(require.resolve('lucide-static/package.json')), 'icons')
const cache = new Map()

export default function renderIcon(name) {
  const cached = cache.get(name)
  if (cached) return cached

  const source = fs.readFileSync(path.join(iconsDir, `${name}.svg`), 'utf8')
  const svg = source
    .replace(/<!--[\s\S]*?-->\s*/, '')
    .replace('class="lucide ', 'class="icon lucide ')
    .replace('<svg', '<svg aria-hidden="true" focusable="false"')

  cache.set(name, svg)
  return svg
}
