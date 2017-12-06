// Require Webpack for HMR
const webpack = require("webpack");
// Required for working with paths and directories
const path = require("path");
// Require autoprefixer
const autoprefixer = require("autoprefixer");
// HTML Template Plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Config for HTML Template Plugin
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, "src/index.html"),
  filename: "index.html",
  title: "React Boilerplate",
  inject: "body",
  favicon: path.join(__dirname, "src/assets/icons/favicon.ico")
});
// Vendor Libs to be bundled separately
const VENDOR_LIBS = ["react", "react-dom", "jquery"];

// Webpack Configs
module.exports = {
  // Dev Server Setup
  devServer: {
    contentBase: "./dist",
    host: "0.0.0.0",
    port: 8080,
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true
  },
  // Entry point for Webpack to bundle
  entry: {
    bundle: ["react-hot-loader/patch", "./src/js/main.jsx"],
    vendor: VENDOR_LIBS
  },
  // Where to bundle to
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        // Convert ES6
        test: /\.js?x$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["react", "env", "flow"]
          }
        }
      },
      {
        // Bundle Styles and run autoprefixer
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      },
      {
        // Bundles font files
        test: /\.(woff|woff2|eot|ttf)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "url-loader",
          options: {
            name: "./fonts/[name].[ext]",
            limit: 30000,
            mimetype: "application/font-woff"
          }
        }
      },
      {
        //Load images and optimize automatically
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 4
              },
              pngquant: {
                quality: "65-90",
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./src/js"), path.resolve("./src"), "node_modules"],
    extensions: [".js", ".jsx"]
  },
  plugins: [
    // Config for HTML Template
    HtmlWebpackPluginConfig,
    // Shows relative path when HMR is enabled
    new webpack.NamedModulesPlugin(),
    // Enabled HMR
    new webpack.HotModuleReplacementPlugin(),
    // Common Modules in separate chunk
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor"]
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
};
