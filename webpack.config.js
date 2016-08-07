var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        GameStage: './src/js/GameStage.js',
        common: ['react-dom', 'react'],
    },
    output: {
        path: './dist/js',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }]
    },
    plugins: [commonsPlugin],
}
