const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
         devServer: {
          proxy: {
            '/user': 'http://localhost:3000',
            '/climbs': 'http://localhost:3000'
          },
        },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                //maybe add minicssextractplugin via npm install and use the loader method instead of the styleloader add it to the plugins just like htmlwebpackplugin above
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
              },
        ]
    }
}


