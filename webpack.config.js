const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

const extractCss = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('[name].css').replace('Css', '');
    },
    ignoreOrder: true,
});

const extractFonts = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('fonts/[name]').replace('fonts/js', 'fonts');
    },
    ignoreOrder: true,
});

const extractImages = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('images/[name]').replace('images/js', 'images');
    },
    ignoreOrder: true,
});

const additionalPlugins = [];

module.exports = {
    mode: NODE_ENV,
    stats: 'minimal',
    bail: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    entry: {
        /** JS */
        main: './src/main.js',
        /** CSS */
        mainCss: './src/scss/main.scss',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/'),
    },
    module: {
        rules: [{
            test: /\.s?css$/,
            use: extractCss.extract({
                use: [{
                    loader: 'css-loader',
                    options: {
                        minimize: NODE_ENV === 'production',
                        sourceMap: NODE_ENV === 'development',
                    },
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: NODE_ENV === 'development',
                    },
                }, {
                  loader: 'postcss-loader',
                }],
                publicPath: '../',
                fallback: 'style-loader',
            }),
        }, {
            test: /\.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'fonts/',
            },
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'images/',
            },
        }],
    },
    resolve: {
        extensions: ['.js', '.scss', '.css'],
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /fr\.js/),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(NODE_ENV),
            },
        }),
        extractCss,
        extractFonts,
        extractImages,
        ...additionalPlugins,
    ],
    optimization: {
        minimize: NODE_ENV === 'production',
    },
    devtool: NODE_ENV === 'production' ? false : 'source-map',
};
