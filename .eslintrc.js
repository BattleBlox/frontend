module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-return-assign': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/comment-directive': 'off'
  }
}
