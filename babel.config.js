const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push(
  [
    'module-resolver',
    {
      root: ['.'],
      extensions: ['.js', '.json', '.ts', '.tsx'],
      alias: {
        '@src': './src',
        '@assets': './src/assets/',
        '@theme': './src/theme/',
        '@styles': './src/styles/',
        '@components': './src/components/',
        '@screens': './src/screens/',
      },
    },
  ],
);

module.exports = {
  presets,
  plugins,
};