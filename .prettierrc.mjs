/** @type {import("prettier").Config} */
export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  // Your preferences
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'es5',
};
