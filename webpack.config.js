const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jquery": "jquery"
    }),
    new CopyPlugin([
      { from: './src/favicon.ico', to: './' }
    ]),
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
    extensions: [".ts", ".js"]
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.ts$|.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
        exclude: "/node_modules/"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          {
            loader: "css-loader",
            options: { sourceMap: isDev }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: isDev,
           }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev
            }
          },
        ]
      },
      {
        test: /\.pug$/,
        use: ["html-loader? attrs = false", "pug-html-loader"]
      }
    ]
  },
  plugins: plugins()
};
