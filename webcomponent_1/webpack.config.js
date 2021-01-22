const path = require('path');

module.exports = {
    entry: {
        home: path.resolve(__dirname, 'src/js/index.js') //ARCHIVO DE ENTRADA
    },
    mode: 'development', // MODO
    output: {
        path: path.resolve(__dirname, 'dist'), // CARPETA DONDE SE GUARDARÁN El/LOS ASSETS COMPILADOS
        filename: 'js/[name].js' // NOMBRE QUE RECIBE EL ARCHIVO.
    },
    //IMPORTAR CSS:
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader','css-loader','sass-loader']
            },
            {
                test: /\.js$/,
                use:'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    }
}