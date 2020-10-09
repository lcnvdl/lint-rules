# lint-rules
Lint rules for my projects

## Prerequisites
```bash
npm i -g bilderhic
```

## Install
```bash
bhic -c extension install https://github.com/lcnvdl/lint-rules.git lint-rules
```

## Usage
Initialize eslint
```bash
bhic -c lint-rules install <rule name>
```

Update repository and eslint rc
```bash
bhic -c lint-rules update [-f or --force]
```

Copy eslint rc from repository
```bash
bhic -c lint-rules copy <rule name>
```

~~ De nada
