const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        webEncodingPolyfill: './src/main/resources/webEncodingPolyfill.ts',
        renderPhotoGallery: './src/main/resources/renderers/renderPhotoGallery.tsx',
    },
    target: ['web', 'es2020'], // Adjust the target as needed for your environment
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
                test: /\.tsx?$/, // Match TypeScript and TSX files
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader', // Use ts-loader to transpile TypeScript
                },
            },
            {
                test: /\.jsx?$/, // Match JavaScript and JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'], // Transpile ES6+, React, and TypeScript
                    },
                },
            },
            {
                test: /\.css$/, // Optional: Add support for CSS files if needed
                use: ['style-loader', 'css-loader'], // Loads CSS files with Webpack
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve both JS/JSX and TS/TSX extensions
    },
    experiments: {
        outputModule: true,
        topLevelAwait: true, // Allows top-level await
    },
};
