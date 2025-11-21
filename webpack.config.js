const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src"),
    },
  },
  target: ["web", "es5"],
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { url: false } },
          "postcss-loader",
          "sass-loader",
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx"],
    }),
  ],
};
