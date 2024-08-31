const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        // Define entry points for different bundles
        foo: [
            'core-js/stable', // Polyfill modern JavaScript features
            'regenerator-runtime/runtime', // Polyfill async/await and generators
            'web-encoding', // Polyfill for TextEncoder and TextDecoder
            './src/main/resources/foo.js' // Your main entry point
        ],
        webEncodingPolyfill: './src/main/resources/webEncodingPolyfill.js', // Another entry point
    },
    target: ['web', 'es2020'], // Target the web and ES2020
    output: {
        path: path.resolve(__dirname, 'src/main/resources'),
        filename: '[name].bundle.mjs', // Output multiple bundles based on entry point names
        libraryTarget: 'module', // Output as ESModules
        module: true,
        chunkFormat: 'module',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // Transpile to compatible JavaScript version
                    },
                },
            },
        ],
    },
    experiments: {
        outputModule: true,
        topLevelAwait: true, // Allows top-level await
    },
};
