<script>
    import { onMount } from 'svelte';
    import Form from '$lib/Form.svelte';
	  import Navbar from '$lib/Navbar.svelte';
  
    let isDarkMode = true;
  
    // Check localStorage for saved theme preference
    onMount(() => {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
      } else {
        // Default to light mode if no preference is saved
        isDarkMode = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
      }
      updateTheme();
    });
  
    // Toggle the theme between light and dark mode
    const toggleTheme = () => {
      isDarkMode = !isDarkMode;
      updateTheme();
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };
  
    // Update the body class based on the current theme
    const updateTheme = () => {
      if (isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
      }
    };
  </script>
  
  <!-- svelte-ignore css_unused_selector -->
  <style>
    body {
      transition: background-color 0.3s ease, color 0.3s ease;
    }
  </style>
  <!-- Main Content -->
  <main class="min-h-screen bg-gradient-to-r from-gray-200 to-gray-50 dark:bg-gradient-r dark:from-slate-800 dark:to-slate-700 transition-all duration-500 ease-in-out">
    <!-- Navigation Menu -->
    <nav class="bg-gray-200 dark:bg-gray-900 p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <!-- Logo / Brand -->
        <div class="text-xl font-semibold text-gray-800 dark:text-white">
          Unblocker 2
        </div>
      <!-- NavBar -->
        <Navbar />
        <!-- Light/Dark Mode Toggle Button -->
        <button 
          on:click={toggleTheme} 
          class="text-gray-800 dark:text-white p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
        >
          {isDarkMode ? '🌙' : '🌞'}
        </button>
      </div>
    </nav>
  
    <!-- Main Content Section -->
    <div class="flex justify-center items-center min-h-screen py-12 px-6">
      <Form />
    </div>
  </main>
     