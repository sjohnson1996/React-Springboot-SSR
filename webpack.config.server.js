const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        foo: './src/main/resources/foo.js',
        webEncodingPolyfill: './src/main/resources/webEncodingPolyfill.js',
        renderPhotoGallery: './src/main/resources/renderers/renderPhotoGallery.js',
    },
    target: ['web', 'es2020'],
    output: {
        path: path.resolve(__dirname, 'src/main/resources/build'),
        filename: '[name].bundle.mjs', // All files go directly into the build folder
        libraryTarget: 'module',
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
