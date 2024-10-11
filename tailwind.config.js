/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",        
    "./components/**/*.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,jsx,ts,tsx}",    
    "./(protected)/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",   
    "./hooks/**/*.{js,jsx,ts,tsx}",   
    "./navigation/**/*.{js,jsx,ts,tsx}",
  ],  
  theme: {
    extend: {
      colors:{
        primary:'#199A8E',
        gray:{
          100:'#CDCDE0',
          200:"#717784"
        },
        secondary:'#F0F0F0',
        buttonColor:"#FBFBFB",
      },
      fontFamily:{
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      }
      
    },
  },
  plugins: [],
}

