const path = require('path');

module.exports = {
    mode: 'production', // or 'development' depending on your environment
    entry: './src/main/resources/static/client.tsx', // Adjust the entry point to TypeScript/TSX file
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static'), // Output the bundled file to your static folder
        filename: 'client.bundle.js', // Name of the bundled output file
        publicPath: '/', // Set the public path to the root of your server
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/, // Match JavaScript, JSX, TypeScript, and TSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'], // Add TypeScript support
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
        extensions: ['.js', '.jsx', '.ts', '.tsx'], // Resolve JS, JSX, TS, and TSX extensions
    },
    devtool: 'source-map', // Optional: Generate source maps for easier debugging
};
