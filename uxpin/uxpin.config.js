module.exports = {
  components: {
    categories: [
      {
        name: "General",
        include: [
          "src/components/c4-button/c4-button.jsx",
          "src/components/c4-star-rating/c4-star-rating.jsx",
        ],
      },
    ],
    wrapper: "src/wrapper/wrapper.jsx",
    webpackConfig: "webpack.config.js",
  },
  name: "Cloud Four System",
};
