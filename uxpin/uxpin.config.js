module.exports = {
  components: {
    categories: [
      {
        name: "General",
        include: ["src/c4-button/c4-button.jsx"],
        include: ["src/c4-star-rating/c4-star-rating.jsx"],
      },
    ],
    webpackConfig: "webpack.config.js",
  },
  name: "New Design System",
};
