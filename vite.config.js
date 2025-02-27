import { resolve } from 'path';
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(__dirname, 'partials'),
    })
  ]
});