const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: "./src/index.js", // Entry point of your application
        output: {
            filename: "bundle.js", // Output bundle file name
            path: path.resolve(__dirname, "dist"), // Output directory
            publicPath: '/'
        },
        mode: isProduction ? 'production' : 'development',
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        module: {
            rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),
            new CleanWebpackPlugin()
        ],
        resolve: {
            extensions: [".js", ".jsx"],
        },
        devServer: {
            historyApiFallback: true,
            static: {
                directory: path.join(__dirname, "./")
              },
            hot: true,
            port: 3000,
            open: true,
            compress: true
        },
        // optimization: {
        //     splitChunks: {
        //         chunks: 'all'
        //     }
        // }
    }
};