const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/app.js'
    ],
    mode: 'development',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html", filename: "./index.html" }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        rules: [{
            test: [/\.jsx?$/, /\.js?$/],
            include: [path.resolve(__dirname, 'src')],
            exclude: [path.resolve(__dirname, "node_modules")],
            loader: "babel-loader",
            query: {
                presets: ["es2015", "react", "env", "stage-0"]
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: 'style-loader' },
                { loader: 'css-loader' }
              ]
        }]
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        port: 3000,
        hot: true
    }
}