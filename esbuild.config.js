const { build } = require('esbuild')
const { copy } = require('esbuild-plugin-copy')
const fs = require('fs')

build({
  entryPoints: [
    'src/index.ts',
    'src/config.ts',
    'src/Sprites/**/*.ts',
    'src/Sprites/*.ts',
    'src/scripts/*.ts',
  ],
  outdir: 'dist',
  bundle: false,
  minify: true,
  sourcemap: false,
  outExtension: { '.js': '.js' },
  resolveExtensions: ['.ts', '.js'],
  loader: {
    '.ts': 'ts',
    '.php': 'copy'
  },
  plugins: [
    copy({
      assets: [
        { from: ['src/index.php'], to: ['./'] },
        { from: ['src/assets/**/*'], to: ['./'] }
      ],
    }),
    {
      name: 'force-js-imports',
      setup(build) {
        build.onLoad({ filter: /\.ts$/ }, (args) => {
          let code = fs.readFileSync(args.path, 'utf8')
          code = code.replace(
            /from\s+['"](\.?\.\/[^'"]+)['"]/g, 
            'from "$1.js"'
          )
          return { contents: code, loader: 'ts' }
        })
      }
    }
  ],
}).catch(() => process.exit(1))