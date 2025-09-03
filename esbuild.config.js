const { build } = require('esbuild')
const { copy } = require('esbuild-plugin-copy')

build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/bundle.js',
  bundle: true,
  minify: true,
  sourcemap: false,
  platform: 'browser',
  target: 'es2020',
  
  // Внешние зависимости, которые подключаются через CDN
  external: ['https://cdn.socket.io/4.4.1/socket.io.min.js'],
  
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
    })
  ],
}).catch(() => process.exit(1))