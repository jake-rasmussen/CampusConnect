/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    require.resolve("prettier-plugin-tailwindcss")
  ],
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  importOrder: [
    "<BUILT_IN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/.*$",
    "^[.]",
    "",
    "<TYPES>",
  ]
};

module.exports = config;