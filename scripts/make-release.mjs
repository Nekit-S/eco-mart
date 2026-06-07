/**
 * Build a comment-free, human-readable source ZIP for handover.
 *
 * - Strips ALL comments from code files (JS/JSX/MJS/CJS via Babel AST → provably safe;
 *   CSS/HTML/SVG via comment-pattern removal). Each removed comment is replaced by a
 *   single space so tokens can never be glued together; formatting is otherwise kept.
 * - Re-parses every stripped JS file as a safety net (fails the build if anything broke).
 * - Excludes junk (node_modules, dist, .git, .vercel, release, logs).
 * - Output: release/<name>-v<version>-src/  (staging)  +  release/<name>-v<version>-src.zip
 *
 * Run: npm run release:zip
 */
import {
  readFileSync,
  readdirSync,
  statSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  existsSync,
} from 'node:fs'
import { join, relative, extname, sep } from 'node:path'
import { parse } from '@babel/parser'
import AdmZip from 'adm-zip'

const ROOT = process.cwd()
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
const BASENAME = `${pkg.name}-v${pkg.version}-src`
const OUT_DIR = join(ROOT, 'release')
const STAGE = join(OUT_DIR, BASENAME)

const EXCLUDE_DIRS = new Set(['node_modules', 'dist', '.git', '.vercel', 'release', '.idea', '.vscode'])
const EXCLUDE_FILE = (name) => name.endsWith('.log') || name === '.DS_Store'

const TEXT_PASS = new Set(['.json', '.webmanifest', '.md', '.txt', '.yml', '.yaml'])
const BINARY = new Set(['.woff2', '.woff', '.ttf', '.png', '.jpg', '.jpeg', '.ico', '.webp', '.gif'])

let removed = 0

function tidy(code) {
  return (
    code
      .replace(/[ \t]+$/gm, '') // trailing whitespace (turns space-only lines blank)
      .replace(/\n{3,}/g, '\n\n') // collapse 3+ blank lines into one
      .replace(/^\s*\n+/, '') // drop leading blank lines
      .replace(/\s+$/, '') + '\n'
  )
}

function stripJs(code, { sourceType = 'module' } = {}) {
  const opts = { sourceType, plugins: ['jsx'] }
  const ast = parse(code, opts)
  const comments = ast.comments || []
  removed += comments.length
  let out = code
  for (const c of [...comments].sort((a, b) => b.start - a.start)) {
    out = out.slice(0, c.start) + ' ' + out.slice(c.end)
  }
  out = tidy(out)
  parse(out, opts) // SAFETY NET: stripped output must still parse
  return out
}

function stripBlockPattern(code, re) {
  removed += (code.match(re) || []).length
  return tidy(code.replace(re, ' '))
}
const stripCss = (code) => stripBlockPattern(code, /\/\*[\s\S]*?\*\//g)
const stripXml = (code) => stripBlockPattern(code, /<!--[\s\S]*?-->/g)

function stripHtml(code) {
  let out = code.replace(/<!--[\s\S]*?-->/g, ' ')
  removed += (code.match(/<!--[\s\S]*?-->/g) || []).length
  // strip JS comments inside inline <script> blocks (no src attribute)
  out = out.replace(/(<script\b(?![^>]*\bsrc=)[^>]*>)([\s\S]*?)(<\/script>)/gi, (_, open, body, close) => {
    let cleaned = body
    try {
      cleaned = '\n' + stripJs(body, { sourceType: 'script' })
    } catch {
      /* if the inline script can't be parsed, leave it untouched */
    }
    return open + cleaned + close
  })
  return tidy(out)
}

function transform(absPath) {
  const ext = extname(absPath).toLowerCase()
  if (BINARY.has(ext)) return readFileSync(absPath) // copy bytes
  const code = readFileSync(absPath, 'utf8')
  try {
    if (ext === '.js' || ext === '.jsx' || ext === '.mjs' || ext === '.cjs') return stripJs(code)
    if (ext === '.css') return stripCss(code)
    if (ext === '.html') return stripHtml(code)
    if (ext === '.svg') return stripXml(code)
    if (TEXT_PASS.has(ext) || ext === '') return code // configs/docs/data: no code comments
    return code
  } catch (e) {
    throw new Error(`Failed processing ${relative(ROOT, absPath)}: ${e.message}`)
  }
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (EXCLUDE_DIRS.has(name) || EXCLUDE_FILE(name)) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, acc)
    else acc.push(full)
  }
  return acc
}

// ---- run ----
if (existsSync(STAGE)) rmSync(STAGE, { recursive: true, force: true })
mkdirSync(STAGE, { recursive: true })

const files = walk(ROOT)
const zip = new AdmZip()
let count = 0

for (const abs of files) {
  const rel = relative(ROOT, abs)
  const content = transform(abs)
  const outPath = join(STAGE, rel)
  mkdirSync(join(outPath, '..'), { recursive: true })
  writeFileSync(outPath, content)
  zip.addFile(`${BASENAME}/${rel.split(sep).join('/')}`, Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf8'))
  count++
}

const zipPath = join(OUT_DIR, `${BASENAME}.zip`)
zip.writeZip(zipPath)

console.log(`✓ ${count} files, ${removed} comments stripped`)
console.log(`✓ staging: ${relative(ROOT, STAGE)}`)
console.log(`✓ zip:     ${relative(ROOT, zipPath)}`)
