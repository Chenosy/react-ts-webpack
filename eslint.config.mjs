import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import jsx from 'react/jsx-runtime'

/** @type {import('eslint').Linter.Config[]} */
export default [
  //忽略文件
  { ignores: ['node_modules', 'build', 'dist'] },
  //默认配置
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  //配置
  jsx.configs.recommended,

  {
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  },
]
