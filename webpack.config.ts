import { Configuration } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const IMAGE_SIZE_LIMIT = 10000;

const config = (): Configuration => {
    return {
        module: {
          rules: [
            {
              test: /\.(ts|js)x?$/i,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                compact: true,
              },
            },
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test: /\.(sc|sa)ss$/i,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'sass-loader',
                },
              ],
            },
            {
              test: /\.less$/i,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                  loader: 'less-loader',
                  options: {
                    lessOptions: {
                      javascriptEnabled: true,
                      modifyVars: {},
                    },
                  },
                },
              ],
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: IMAGE_SIZE_LIMIT,
                },
              },
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    prettier: false,
                    svgo: false,
                    svgoConfig: {
                      plugins: [{ removeViewBox: false }],
                    },
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: 'file-loader',
                  options: {
                    name: 'static/media/[name].[hash].[ext]',
                  },
                },
              ],
            },
          ],
        },
        resolve: {
            extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
            alias: {
                src: path.resolve(__dirname, './src/'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./public/index.html",
                inject: true,
            }),
            new MiniCssExtractPlugin({
              filename: 'static/css/[name].[contenthash:8].css',
              chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
        ],
    };
};

export default config;