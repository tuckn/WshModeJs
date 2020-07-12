/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: [
    './assets/',
    './coverage/',
    './dist/',
    './node_modules/',
    './WshModules/',
    '!*.js',
  ],
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    'WScript': false,
    'ActiveXObject': false,
    'ScriptEngine': false,
    'ScriptEngineMajorVersion': false,
    'ScriptEngineMinorVersion': false,
    'ScriptEngineBuildVersion': false,
    'Enumerator': false,
    'GetObject': false,
    'VBArray': false
  },
  rules: {
    'array-bracket-spacing': ['warn', 'never'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-style': ['error', 'last'],
    'curly': ['error', 'multi-line'],
    'dot-location': ['warn', 'property'],
    'eol-last': ['warn', 'always'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['warn', 2, {
        'flatTernaryExpressions': true,
        'MemberExpression': 2
    }],
    'key-spacing': ['error', { 'afterColon': true }],
    'keyword-spacing': ['warn'],
    'linebreak-style': ['error', 'windows'],
    'no-console': ['off'],
    'no-control-regex': ['off'],
    'no-multi-spaces': ['warn', { 'ignoreEOLComments': true }],
    'no-trailing-spaces': ['warn'],
    'no-unneeded-ternary': 'error',
    'no-unused-vars': [
        'warn', {
            'vars': 'all',
            'args': 'after-used',
            'ignoreRestSiblings': false
        }
    ],
    'object-curly-spacing': ['warn', 'always'],
    'operator-linebreak': ['warn', 'before'],
    'prettier/prettier': 'warn',
    'quotes': ['warn', 'single'],
    'semi': ['error', 'always'],
    'semi-spacing': 'error',
    'space-before-blocks': ['warn', 'always'],
    'space-before-function-paren': ['warn', 'always'],
    'spaced-comment': ['warn', 'always', {
        'exceptions': ['-', '+', '/'],
        'markers': ['/']
    }],
    'space-in-parens': ['warn', 'never'],
    'space-infix-ops': 'warn'
  },
};
