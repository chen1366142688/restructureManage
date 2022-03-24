const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
// var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        main: '@/main',
        'vender-base': '@/vendors/vendors.base.js',
        'vender-exten': '@/vendors/vendors.exten.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist/dist')
    },
    devServer: {
        compress: true,
        hot: true,
        historyApiFallback: true,
        host: "localhost",
        port:8866,
        inline: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        less: ExtractTextPlugin.extract({
                            use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                            fallback: 'vue-style-loader'
                        }),
                        css: ExtractTextPlugin.extract({
                            use: ['css-loader', 'autoprefixer-loader'],
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            // {
            //     test: /\.js[x]?$/,
            //     include: [resolve('src')],
            //     exclude: /node_modules/,
            //     loader: 'happypack/loader?id=happybabel'
            // },
            {
              test: /\.js$/,
              use: 'happypack/loader?id=babel',
              include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
              exclude: file => (/node_modules/.test(file) && !/\.vue\.js/.test(file))
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                }),
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // new HappyPack({
        //     id: 'happybabel',
        //     loaders: ['babel-loader'],
        //     threadPool: happyThreadPool,
        //     cache: true,
        //     verbose: true
        // })
        new HappyPack({
          id: 'babel',
          loaders: ['cache-loader', 'babel-loader']
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue' ,'json' , 'less'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('../src'),
        }
    }
};