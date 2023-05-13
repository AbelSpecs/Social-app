const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CURRENT_WORKING_DIR = process.cwd();
require('dotenv').config();

const config = {
    name: "browser",
    mode: "development",
    devtool: "source-map",
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DIR, './src/client/index.js')
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, '/dist/'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
            filename: './index.html',
        }),
        new webpack.DefinePlugin({
            BASE_URL: JSON.stringify(process.env.BASE_URL),
        })
    ],
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    }
};

module.exports = config;