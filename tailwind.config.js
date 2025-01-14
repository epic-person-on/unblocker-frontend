export default {
	darkMode: 'class', // Enable dark mode using the 'class' strategy
	content: [
	  './src/**/*.{html,js,svelte}', // Adjust to your file extensions
	],
	theme: {
	  extend: {
		colors: {
		  gray: {
			100: '#f7fafc',
			200: '#edf2f7',
			300: '#e2e8f0',
			400: '#cbd5e0',
			500: '#a0aec0',
			600: '#718096',
			700: '#4a5568',
			800: '#2d3748',
			900: '#1a202c',
		  },
		},
	  },
	},
	plugins: [],
  };
  