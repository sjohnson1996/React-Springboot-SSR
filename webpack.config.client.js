const path = require('path');

module.exports = {
    mode: 'production', // or 'development' depending on your environment
    entry: './src/main/resources/static/client.js', // Adjust this path to where your client-side JS file is located
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static'), // Output the bundled file to your static folder
        filename: 'client.bundle.js', // Name of the bundled output file
        publicPath: '/', // Set the public path to the root of your server
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match JavaScript and JSX files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'], // Transpile ES6+ and JSX
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
        extensions: ['.js', '.jsx'], // Resolve both JS and JSX extensions
    },
    devtool: 'source-map', // Optional: Generate source maps for easier debugging
};
