const HtmlWebpackPlugin = require('html-webpack-plugin');
const { loader } = require('mini-css-extract-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { Template } = require('webpack');

//webpack 文件
//https://webpack.js.org/concepts/

module.exports = {

    //輸入檔
    entry:'./src/index.js', //input 預設index.js所以可不用寫

    
    //輸出檔
    //[hash]可以讓每次輸出檔都是不同檔名，可以讓catch強制更新
    output: {   
        path: path.resolve(__dirname,'dist'),
        filename:'index.[hash].js',
    },

    //模式，輸出是否要壓縮（production or development)
    mode: 'production',


    //roader
    //讓webpac讀懂一些不同語言的code ex.css
    //npm install --save-dev css-loader
    //npm install --save-dev style-loader
    //resource 是一個內建loader 

    //套件 postcss 自動補齊各家瀏覽器讀得懂的前綴 設定支援瀏覽器
    //npm i postcss -D
    //另外增加postcss.config.js設定檔、增加.browserslistrc檔案（設定支援的瀏覽器)

    //套件Babel 讓各瀏覽器支援最新語法（改寫成就舊瀏覽器看得懂的code)
    //npm i babel-loader @babel/core -D
    //另外增加 babel.config.json檔案

    //套件sass loader
    //npm install sass-loader sass webpack --save-dev


    module:{
        rules:[
            {
                test:/\.css$|\.scss$/i,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader:'css-loader',
                        options:{
                            importLoaders:1,
                        }
                    },
                    {
                        loader:'postcss-loader'
                    },
                    {
                        loader:'sass-loader'
                    }
                ],
            },

            {
                test:/\.(gif|png)/,
                type: 'asset/resource'   
            },

            {
                test:/\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                }
            },

        ],
    },

    //套件一 輸出時自動產生hmtl (html-webpack-plugin套件 )
    //npm install --save-dev html-webpack-plugin
    //{template} 指定模板輸出（保留開發版有的設定)

    //套件二 輸出檔案自動產生css檔
    //npm install --save-dev mini-css-extract-plugin
    //plugins 跟 rules loader都要設定
    plugins:[
        new HtmlWebpackPlugin({
        template: './src/index.html'
        }),

        new MiniCssExtractPlugin({
            filename:'index.[hash].css'
        }),

    ],

    //在開發模式console狀態下，可以連結到開發模式的檔案(debug)
    devtool: 'source-map'

}