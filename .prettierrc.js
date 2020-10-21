module.exports = {
  bracketSpacing: true,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'always',
  semi: false,
  tabWidth: 2,
  overrides: [
    {
      files: '.github/**/*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
    {
      files: '*.scss',
      options: {
        singleQuote: false,
      },
    },
  ],
}
