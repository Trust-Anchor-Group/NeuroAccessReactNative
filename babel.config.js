const presets = ['module:metro-react-native-babel-preset'];
const plugins = [];

plugins.push(
  [
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
  ],
);

module.exports = {
  presets,
  plugins,
};
