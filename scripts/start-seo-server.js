const { existsSync } = require('fs')
const { spawn } = require('child_process')
const path = require('path')
const pkg = require(path.resolve('package.json'))

const hasViteConfig =
  existsSync('vite.config.js') || existsSync('vite.config.ts') ||
  existsSync('vite.config.mjs') || existsSync('vite.config.cjs')

const hasViteDep =
  (pkg.devDependencies && pkg.devDependencies.vite) ||
  (pkg.dependencies && pkg.dependencies.vite)

const [cmd, args] = hasViteConfig || hasViteDep
  ? ['vite', ['preview', '--strictPort', '--host', '0.0.0.0', '--port', '8080']]
  : ['serve', ['-s', 'dist', '-l', '8080']]

const child = spawn('npx', [cmd, ...args], { stdio: 'inherit' })
child.on('exit', code => process.exit(code ?? 0))
