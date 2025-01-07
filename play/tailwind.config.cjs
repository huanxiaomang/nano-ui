const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,less,css}','../packages/components/**/*.{vue,ts,jsx,tsx,less,css}'],
  darkMode: 'class', // or 'media' or 'class'
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        xxl: '1536px',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, theme }) {
      const addMedia = (name, minWidth) => {
        const collapsedWidth = 160;
        addVariant(name, [
          `@media (min-width: ${minWidth}px)`,
          `@media (min-width: ${minWidth - collapsedWidth}px) {.collapsed &}`,
        ]);
      };
      const screens = Object.keys(theme('screens'));
      screens.forEach((name) => addMedia(`${name}x`, parseInt(theme(`screens.${name}`).replace('px', ''))));
    })
  ],
};
