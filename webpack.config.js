const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

module.exports = env => {
  const envValue = env || 'production';

  let optimizationObject = {
    minimize: false
  };

  let pluginsArray = [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ];

  if (envValue === 'production') {
    pluginsArray = [
      ...pluginsArray,
      new OptimizeJsPlugin({
        sourceMap: false
      })
    ];
  }

  return {
    mode: envValue,
    entry: './src/index.js',
    optimization: optimizationObject,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'app.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            },
            // Compiles Sass to CSS
            'sass-loader'
          ]
        }
      ]
    },
    plugins: pluginsArray
  };
};
