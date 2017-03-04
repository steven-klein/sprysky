import buble from 'rollup-plugin-buble';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

let cache;

export default {
    entry: 'resources/assets/js/app.js',
    dest: 'docs/assets/js/app.js',
    cache: cache,
    format: 'iife',
    useStrict: true,
    plugins: [
        resolve({
            jsnext: true, // Default: false
            main: true, // Default: true
            browser: true,
            extensions: ['.js', '.json']
        }),
        commonjs({
            include: ['node_modules/**', 'resources/**'],
            extensions: ['.js', '.json'],
            // if false then skip sourceMap generation for CommonJS modules
            sourceMap: true, // Default: true
        }),
        buble(),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        }),
        (process.env.NODE_ENV === 'production' && uglify())
    ],
    sourceMap: (process.env.NODE_ENV !== 'production') ? true : false
}
