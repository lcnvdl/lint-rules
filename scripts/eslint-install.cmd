echo Installing ESLint...
npm i --save-dev eslint

echo Installing ESLint Airbnb style...
npm i --save-dev eslint-plugin-import eslint-config-airbnb-base

Echo Copying Json...
copy "[lint-rules-dir]/js/.eslintrc.json" ".eslintrc.json"

echo Success