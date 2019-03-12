module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {},
        'transform-runtime': {},
        'styled-jsx': {},
        'class-properties': {}
      }
    ]
  ],
  plugins: [
    ['import', { libraryName: 'antd', style: true }],
    ['styled-components', { ssr: true }]
  ]
};
