import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  vue: true,
  formatters: true,
  stylistic: {
    semi: true,
    singleQuote: true,
  },
});
