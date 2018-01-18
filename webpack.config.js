var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'), // 抽取css字符串并生成css文件
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    context: __dirname,

    entry: {
        'index': ['./src/index.js']
    },

    output: {
        // 打包之后的文件名
        filename: '[name].bundle.js',

        // 定义打包文件的存储路径
        path: path.resolve('./dist'),

        // 声明资源（js、css、图片等）的引用路径
        publicPath: ''
    },

    // 定义项目里各种类型模块的处理方式
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    'url-loader?limit=10000&name=img/[name].[hash:8].[ext]'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        // clean
        new CleanWebpackPlugin(['dist']),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js'
        }),

        // 生成html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: 'index'
        }),

        new ExtractTextWebpackPlugin('style.css'),

        new ManifestPlugin()
    ],

    devtool: 'source-map'
}
