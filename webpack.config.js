module.exports = {
    entry: './src/js/GameStage.js',
    output: {
        path: './dist/js',
        filename: 'GameStage.js'
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
    }
}
