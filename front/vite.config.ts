import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ 
    svgr({
      include: '**/*.svg'
    }), 
    react()
  ],
  optimizeDeps: {
    include: ['**/*.scss'], // Include all .scss files
  },
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  resolve: {
    alias: [
      {find: '@', replacement: '/src'}
    ]
  },
  // define: {
  //   __IS_DEV__: JSON.stringify(true),
  //   __API__: JSON.stringify('http://localhost:8000'),
  // }
})