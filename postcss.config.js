module.exports = {
  plugins: [
    require("postcss-preset-env")({
      stage: 3, // Enables modern CSS features
    }),
    require("autoprefixer"),
  ],
};
