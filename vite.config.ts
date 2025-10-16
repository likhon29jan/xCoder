import remixPlugin from '@remix-run/dev'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules'
import tsconfigPaths from 'vite-tsconfig-paths'

const { vitePlugin: remix } = remixPlugin

export default defineConfig({
  plugins: [remix(), tsconfigPaths(), optimizeCssModules(), nodePolyfills(), UnoCSS()]
})
