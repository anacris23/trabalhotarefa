module.exports = (api) => {
  api.cache(true);

  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'src',
        },
      ],
    ],
    env: {
      // For React Native
      production: {
        plugins: [
          [
            'babel-plugin-root-import',
            {
              rootPathSuffix: 'src',
            },
          ],
        ],
      },
    },
  };
};
