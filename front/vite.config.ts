import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    svgr({
      include: '**/*.svg'
    }), 
    react()
  ],
  css: {
        modules: {
            // Настройки для модулей CSS
            scopeBehaviour: 'local', // 'local' или 'global'
            globalModulePaths: [], // Путь для глобальных модулей
            generateScopedName: '[name]__[local]___[hash:base64:5]', // Настройка имени класса
        },
    },
  // resolve: {
  //   alias: [
  //     {find: '@', replacement: '/src'}
  //   ]
  // },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
  },
  },
  // define: {
  //   __IS_DEV__: JSON.stringify(true),
  //   __API__: JSON.stringify('http://localhost:8000'),
  // }
})