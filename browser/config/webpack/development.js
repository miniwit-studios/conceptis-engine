let { ContextReplacementPlugin, DefinePlugin } = require('webpack');
let path = require('path');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./common');
let clientConfig = require('./client-config');

//Loaders
let $awesomeTypescript = {
    loader: 'awesome-typescript-loader'
};

let $raw = {
    loader: 'raw-loader'
};

let devConfig = {
    mode: 'development',

    entry: {
        'main': './src/main.browser.ts'
    },

    output: {
        path: path.resolve(__dirname, '../../dist/scripts')
    },

    plugins: [
        new DefinePlugin(clientConfig)
    ],

    module: {
        rules: [
            { test: /\.ts$/, loaders: [$awesomeTypescript], exclude: /\.spec\.ts$/ },
            { test: /\.glslx$/, loaders: [$raw] }
        ]
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    }
};

module.exports = webpackMerge(commonConfig, devConfig);
