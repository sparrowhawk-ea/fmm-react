import commonjs from '@rollup/plugin-commonjs'
import css from "rollup-plugin-import-css"
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default [
  {
    input: 'src/index.ts',
    external: ['react'],
    plugins: [replace({'process.env.NODE_ENV': true}), esbuild({minify: true}), nodeResolve(), commonjs()],
    output: [
      {
        esModule: false,
        exports: 'named',
        file: `dist/index.js`,
        format: 'umd',
        globals: { react: 'React' },
        name: 'FmmReact'
      },
      {
        exports: 'named',
        file: `dist/index.mjs`,
        format: 'es'
      }
    ],
  },{
    input: 'src/index.ts',
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: 'es',
    },
  },
  {
    input: 'src/demo.tsx',
    external: ['react'],
    plugins: [replace({'process.env.NODE_ENV': true}), css(), esbuild({minify: true}), nodeResolve(), commonjs()],
    output: [
      {
        esModule: false,
        exports: 'named',
        file: `demo/index.js`,
        format: 'umd',
        globals: { react: 'React' },
        name: 'FmmReactDemo'
      }
    ],
  }
]
