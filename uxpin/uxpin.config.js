module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/Button/Button.js',
        ]
      }
    ],
    wrapper: 'src/Wrapper/UXPinWrapper.js',
    webpackConfig: 'webpack.config.js',
  },
  name: 'New Design System'
};