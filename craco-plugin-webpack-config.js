const CircularDependencyPlugin = require('circular-dependency-plugin');
const path = require('path');

module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => ({
    ...webpackConfig,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: [
        path.resolve('node_modules'),
        path.resolve('src'),
      ],
    },
    output: {
      path: path.resolve('build'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
      globalObject: 'this',
    },
    plugins: [
      ...webpackConfig.plugins,
      new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        include: /src/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
      }),
    ],
  })
};

