const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const PATHS = {
  src: path.join(__dirname, "src"),
  docs: path.join(__dirname, "dist")
};

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.pug",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
      template: "./src/index.scss"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jquery": "jquery"
    }),
    new CopyPlugin([
      { from: './src/favicon.ico', to: './' }
    ]),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: [
          "default",
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    })
  ];

  return base;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env", 
          "@babel/preset-typescript"
        ],
        plugins: [
          "@babel/plugin-proposal-class-properties"
        ]
      }
    }
  ];

  if (isDev) {
    loaders.push("eslint-loader");
  }

  return loaders;
};

module.exports = {
  mode: "development",
  entry: PATHS.src + "/index.ts",
  output: {
    filename: "app.js",
    path: PATHS.docs
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? "source-map" : "",
  module: {
    rules: [
      {
        test: /\.tsx?$|.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.pug$/,
        use: ["html-loader? attrs = false", "pug-html-loader"]
      }
    ]
  },
  plugins: plugins()
};
