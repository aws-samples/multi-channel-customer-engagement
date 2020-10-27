const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: ['./js/init.js','./js/jquery.slimscroll.js', './js/data-query.js','./js/dashboard-data.js', './js/chatbot.js', './js/click-stream.js', './js/amazon-connect-chat-interface.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        //new CopyWebpackPlugin(['./js/config.json']),
        new webpack.HotModuleReplacementPlugin()
        ]
};