const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

dotenv.config();

function p_root(...args) {
    return path.resolve(__dirname, ...args);
}
function p_src(...args) {
    return p_root('src', ...args);
}
function p_dist(...args) {
    return p_root('dist', ...args);
}
function p_components(...args) {
    return p_src(`components`);
}
function p_exercises(...args) {
    return p_src(`exercises`);
}
function p_styles(...args) {
    return p_src('styles', ...args);
}
function p_shared(...args) {
    return p_src('shared', ...args);
}

const config = {
    entry: './src/index.tsx',
    output: {
        path: p_dist(),
        filename: 'bundle.js',
        globalObject: 'this',
        library: {
            name: "chipopino-exercise",
            type: "umd"
        },
    },
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/,
                type: 'asset',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            src: p_src(),
            styles: p_styles(),
            components: p_components(),
            exercises: p_exercises(),
            shared: p_shared(),
            react: path.resolve('./node_modules/react'),
        },
    },
    plugins: [
        new Dotenv({
            path: './.env',
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: p_styles('chipopino.css'), to: p_dist('chipopino.css') },
            ],
        }),
    ],
    mode: isProduction ? 'production' : 'development',
};

module.exports = config;
