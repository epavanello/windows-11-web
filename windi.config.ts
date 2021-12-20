import { defineConfig } from '@windicss/plugin-utils'

export default defineConfig({
  purge: ['./src/app.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      cairo: ['Cairo', 'sans-serif']
    }
  },
  darkMode: 'class',
  attributify: false,
  shortcuts: {
    ...(process.env.NODE_ENV == 'development'
      ? {
          'debug-screens':
            'before:bottom-0 before:left-0 before:fixed before:z-[2147483647] before:px-1 before:text-sm before:bg-black before:text-white before:shadow-xl @sm:before:content-["screen:sm"] @md:before:content-["screen:md"] @lg:before:content-["screen:lg"] @xl:before:content-["screen:xl"] @2xl:before:content-["screen:2xl"] <sm:before:content-["screen:none"]'
        }
      : {})
  }
})
