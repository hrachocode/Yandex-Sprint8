var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/scripts/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env'],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        "@babel/plugin-proposal-class-properties"
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
            ,
            {
                test: /\.(ttf|eot|svg|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3001,
        proxy: [
            {
                path: "/api/*",
                target: "http://localhost:3001/"
            }
        ],
        historyApiFallback: {
            index: '/app'
        },
        openPage: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            hash: true
        })
    ]
};
