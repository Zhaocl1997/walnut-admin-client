module.exports = {
  '*.{js,jsx,ts,tsx}': ['npm run lint:eslint', 'npm run lint:prettier'],
  '*.vue': ['npm run lint:prettier', 'npm run lint:stylelint'],
  '*.{css,scss,less,styl,html}': [
    'npm run lint:prettier',
    'npm run lint:stylelint',
  ],
}
