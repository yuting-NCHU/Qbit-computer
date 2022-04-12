//引用path模組
const path = require('path');

module.exports = {

   //development 指開發模式，代碼未壓縮
   //production 指產品模式，代碼壓縮
   mode: 'development',
   //這個webpack打包的對象，這裡面加上剛剛建立的index.js
   entry: {
      index: './src/index.js',
      // search_all:'./static/js/search_all.jsx'
   },
   output: {
      //這裡是打包後的檔案名稱
      filename: './src/bundle.js', //[name].js',
      //打包後的路徑，這裡使用path模組的resolve()取得絕對位置，也就是目前專案的根目錄
      path: path.resolve('./'),
   },
   module: {
      //rules的值是一個陣列可以存放多個loader物件
      rules: [{
         test: /.js$/, //指定編譯檔案的副檔名為何，用正規表達式來尋找結尾處為.js的檔案
         exclude: /node_modules/, //指定不編譯的路徑，因為我們把網站上傳到server的時候，其實不會連node_nodules資料夾也一起放上去，所以就不需要特別編譯他了
         use: { //用來編譯符合副檔名條件的loader
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-react', '@babel/preset-env'] } //指定loader套件中的presets是哪一個，因為我們要編譯的是JSX，所以這裡輸入@babel/preset-react
         }
      },
      {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
      }

      ]
   },
   //增加一個給devserver的設定
   devServer: {
      //指定開啟port為9000
      port: 9000,
      // host: '0.0.0.0',
   }
};