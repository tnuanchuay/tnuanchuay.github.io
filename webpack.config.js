const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    console.table(env);
    return {
        entry: './src/index.tsx',
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        output: {
            filename: 'app.js',
            publicPath: env.PROD ? '/signals/' : '/', 
            path: env.PROD ? path.resolve(__dirname, 'signals') : path.resolve(__dirname, 'dist')
        },
        mode: 'development',
        plugins: [new HtmlWebpackPlugin({
            template: 'template.html'
        })],
        devServer: {
            devMiddleware: {
                writeToDisk: true
            },
            static: {
                directory: path.join(__dirname, 'dist')
            },
            port: 8000,
            open: true,
        }
    };
}