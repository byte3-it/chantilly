import { select, input, confirm } from '@inquirer/prompts'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgPath = resolve(__dirname, '../packages/sdk/package.json')

const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
const current: string = pkg.version
const [major, minor, patch] = current.split('.').map(Number)

const nextPatch = `${major}.${minor}.${patch + 1}`
const nextMinor = `${major}.${minor + 1}.0`
const nextMajor = `${major + 1}.0.0`

const chosen = await select({
  message: `Current version is ${current}. Select next version:`,
  choices: [
    { name: `patch  →  ${nextPatch}`, value: nextPatch },
    { name: `minor  →  ${nextMinor}`, value: nextMinor },
    { name: `major  →  ${nextMajor}`, value: nextMajor },
    { name: 'custom', value: 'custom' },
  ],
})

const version =
  chosen === 'custom'
    ? await input({ message: 'Enter version (x.y.z):' })
    : chosen

console.log(`
This will:
  1. Bump packages/sdk/package.json  ${current}  →  ${version}
  2. git commit -m "chore: bump sdk to v${version}"
  3. git tag -a v${version} -m "v${version}"
  4. git push origin main --tags
`)

const ok = await confirm({ message: 'Proceed?', default: false })
if (!ok) {
  console.log('Aborted.')
  process.exit(0)
}

pkg.version = version
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
console.log(`✓ Bumped to ${version}`)

execSync('git add packages/sdk/package.json', { stdio: 'inherit' })
execSync(`git commit -m "chore: bump sdk to v${version}"`, { stdio: 'inherit' })
console.log('✓ Committed')

execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })
console.log(`✓ Tagged v${version}`)

execSync('git push origin main --tags', { stdio: 'inherit' })
console.log(`✓ Pushed\n\nDone! GitHub Actions will publish v${version} to npm.`)
