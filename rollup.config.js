import babel from 'rollup-plugin-babel'
import closure from '@ampproject/rollup-plugin-closure-compiler'
import pkg from './package.json'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import camelCase from 'lodash/camelCase'

let serve

if (process.env.NODE_ENV != 'production') {
    serve = require('rollup-plugin-serve')
}

// common config settings - export to UMD and CJS
const base = {
    input: 'src/index.js',
    output: [
        {
            // package will remove @fuzzco scope from module name
            name: camelCase(pkg.name.replace(/^@fuzzco/, '')),
            file: pkg.browser,
            format: 'umd'
        },
        { file: pkg.main, format: 'cjs' }
    ]
}

const dev = [
    {
        ...base,
        plugins: [
            babel(),
            serve({
                contentBase: ['dist', 'demo'],
                port: 3000
            }),
            livereload()
        ]
    }
]

const production = [
    {
        // ES module for importing
        input: 'src/index.js',
        output: [{ file: pkg.module, format: 'es' }],
        plugins: [babel()]
    },
    {
        ...base,
        plugins: [babel(), closure(), terser()]
    }
]

export default (process.env.NODE_ENV == 'production' ? production : dev)
