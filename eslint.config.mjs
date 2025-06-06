
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  plugins: ['vue'],
  extends: [
    '@nuxt/eslint-config', // Nuxt's default configuration
    'plugin:vue/vue3-recommended', // Vue 3 recommended rules
  ],
  rules: {
    // 'vue/multi-word-component-names': 'off', // Disable the multi-word rule
  },
});