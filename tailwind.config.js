module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-bg-image': 'url("https://www.transparenttextures.com/patterns/dirty-old-black-shirt.png")',
        'light-bg-image': 'url("https://www.transparenttextures.com/patterns/first-aid-kit.png")',
        // '': "url('/img/footer-texture.png')",
        
      },
      backgroundColor: {
        'dark-bg-color': "rgba(10,10,10,0.93)",
        'light-bg-color': "rgba(210,210,210,0.93)",
      }
    
       
    },
    fontFamily: {
      'sans': ['"Open Sans"'],
    }
  },
  plugins: [require('tailwindcss-textshadow')],
  darkMode: 'class', 
};
