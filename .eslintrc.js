module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@vue/eslint-config-standard',
    'plugin:vuejs-accessibility/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Enforce alt text on images; keep translated via i18n keys in templates
    'vuejs-accessibility/alt-text': 'error',
  },
}
