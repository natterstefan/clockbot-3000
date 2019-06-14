module.exports = {
  extends: 'eslint-config-ns',
  rules: {
    'class-methods-use-this': 0,
    'import/no-named-as-default': 0,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          ['internal', 'index', 'parent', 'sibling'],
        ],
      },
    ],
    'jest/prefer-strict-equal': 'error',
    'no-underscore-dangle': 0, // because we need eg. __typename pretty often
    'react/forbid-foreign-prop-types': 0,
    'react/no-did-update-set-state': 0,
    'sort-keys': 0,
  },
}
