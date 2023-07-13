const presets = ['module:metro-react-native-babel-preset'];
let plugins = [];

plugins.push([
  'module-resolver',
  {
    root: ['./Src'],
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@': './Src',
      '@Assets': './Src/Assets/',
      '@Controls': './Src/Controls/',
      '@Extensions': './Src/Extensions/',
      '@Helpers': './Src/Helpers/',
      '@Pages': './Src/Pages/',
      '@Services': './Src/Services/',
      '@Theme': './Src/Theme/',
      '@Translations': './Src/Translations/',
    },
  },
]);
plugins.push([
  'react-native-reanimated/plugin',
  {
    globals: ['__scanCodes'],
  },
]);

module.exports = {
  presets,
  plugins,
};
