const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig) =>
  condition ? ensureArray(config) : ensureArray(negativeConfig);

const cssRules = [
  { loader: 'css-loader' },
  {
    loader: 'postcss-loader',
    options: { plugins: () => [
      require('autoprefixer')(),
      require('cssnano')()
    ] }
  }
];

const sassRules = [
  {
    loader: "sass-loader",
    options: {
      includePaths: ["node_modules"]
    }
  }
];

module.exports = function (env, { mode, server, extractCss }) {
  const production = mode === 'production';
  return {
    mode: production ? 'production' : 'development',
    devtool: production ? 'nosources-source-map' : 'cheap-module-eval-source-map',
    entry: './dev-app/main.ts',
    resolve: {
      extensions: ['.ts', '.js'],
      modules: ['src', 'node_modules']
    },
    devServer: {
      historyApiFallback: true,
      open: !process.env.CI,
      port: 9000,
      lazy: false
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          issuer: [{ not: [{ test: /\.html$/i }] }],
          use: extractCss ? [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
          ] : ['style-loader', ...cssRules]
        },
        {
          test: /\.css$/i,
          issuer: [{ test: /\.html$/i }],
          // CSS required in templates cannot be extracted safely
          // because Aurelia would try to require it again in runtime
          use: cssRules
        },
        {
          test: /\.scss$/,
          use: extractCss ? [{
            loader: MiniCssExtractPlugin.loader
          }, ...cssRules, ...sassRules
          ]: ['style-loader', ...cssRules, ...sassRules],
          issuer: /\.[tj]s$/i
        },
        {
          test: /\.scss$/,
          use: ['css-loader', 'sass-loader'],
          issuer: /\.html?$/i
        },
        { test: /\.ts$/i, loader: 'ts-loader', exclude: /node_modules/ },
        { test: /\.html$/i, loader: 'html-loader' }
      ]
    },
    plugins: [new HtmlWebpackPlugin({ template: 'index.ejs' }),
    ...when(extractCss, new MiniCssExtractPlugin({ // updated to match the naming conventions for the js files
      filename: production ? 'css/[name].[contenthash].bundle.css' : 'css/[name].[hash].bundle.css',
      chunkFilename: production ? 'css/[name].[contenthash].chunk.css' : 'css/[name].[hash].chunk.css'
    })),

    ]
  }
}
