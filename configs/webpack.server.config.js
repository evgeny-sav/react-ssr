const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    context: path.resolve(__dirname, '..', 'server'),
    entry: {
        server: ['./index.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '..', 'build'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /(\.jsx?)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
};