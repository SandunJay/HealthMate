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
    extend: {},
  },
  plugins: [],
}

