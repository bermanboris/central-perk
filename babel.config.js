module.exports = function(api) {
  api.cache(true);

  const presets = [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/typescript',
  ];

  const plugins = ['@babel/proposal-class-properties'];
  return { presets, plugins };
};
