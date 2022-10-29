const webpackConfigPlugin = require('./craco-plugin-webpack-config');


module.exports = async function() {
  await new Promise((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('Build webpack');
      resolve();
    });
  });

  return  {
    plugins: [
      { plugin: webpackConfigPlugin }
    ]
  };
};
