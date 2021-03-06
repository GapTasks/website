const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
              test: /\.js$/, // Transform all .js files required somewhere with Babel
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader'
              },
            },
            {
              // Preprocess our own .css files
              // This is the place to add your own loaders (e.g. sass/less etc.)
              // for a list of loaders, see https://webpack.js.org/loaders/#styling
              test: /\.css$/,
              exclude: /node_modules/,
              use: ['style-loader', 'css-loader'],
            },
            {
              // Preprocess 3rd party .css files located in node_modules
              test: /\.css$/,
              include: /node_modules/,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(eot|otf|ttf|woff|woff2)$/,
              use: 'file-loader',
            },
            {
              test: /\.svg$/,
              use: [
                {
                  loader: 'svg-url-loader',
                  options: {
                    // Inline files smaller than 10 kB
                    limit: 10 * 1024,
                    noquotes: true,
                  },
                },
              ],
            },
            {
              test: /\.(jpg|png|gif)$/,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    // Inline files smaller than 10 kB
                    limit: 10 * 1024,
                  },
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                    mozjpeg: {
                      enabled: false,
                      // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                      // Try enabling it in your environment by switching the config to:
                      // enabled: true,
                      // progressive: true,
                    },
                    gifsicle: {
                      interlaced: false,
                    },
                    optipng: {
                      optimizationLevel: 7,
                    },
                    pngquant: {
                      quality: '65-90',
                      speed: 4,
                    },
                  },
                },
              ],
            },
            {
              test: /\.html$/,
              use: 'html-loader',
            },
            {
              test: /\.(mp4|webm)$/,
              use: {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                },
              },
            },
          ],
    },
    resolve: {
      // options for resolving module requests
      // (does not apply to resolving to loaders)
      modules: [
        "node_modules",
        path.resolve(__dirname, "src")
      ],
      // directories where to look for modules
      extensions: [".js", ".json", ".jsx", ".css"],
      // extensions that are used
      alias: {
        // a list of module name aliases
        //"module": "new-module",
        // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
        //"only-module$": "new-module",
        // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
        //"module": path.resolve(__dirname, "app/third/module.js"),
        // alias "module" -> "./app/third/module.js" and "module/file" results in error
        // modules aliases are imported relative to the current context
      },
      /* alternative alias syntax (click to show) */
      /* Advanced resolve configuration (click to show) */  
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }])
    ]
};

module.exports = config;
