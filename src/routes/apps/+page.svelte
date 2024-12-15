<script>
  import { onMount } from 'svelte';
  import Form from '$lib/Form.svelte';
  import Navbar from '$lib/Navbar.svelte';

  let isDarkMode = true;
  /**
	 * @type {any[]}
	 */
  let items = []; // Array to hold data from the JSON file

  // Check localStorage for saved theme preference
  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      isDarkMode = savedTheme === 'dark';
    } else {
      // Default to light mode if no preference is saved
      isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    updateTheme();

    // Fetch the JSON file (stored in staticfolder)
    fetch('/assets/json/apps.json')
      .then(response => response.json())
      .then(data => {
        items = data;
        console.log(items); // Debugging: Check loaded data
      })
      .catch(err => console.error("Error loading JSON:", err));
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

<style>
  body {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .card-container {
    transition: transform 0.3s ease;
  }
  .card-container:hover {
    transform: scale(1.05);
  }
</style>


<!-- Main Content -->
<main class="min-h-screen bg-gradient-to-r from-gray-200 to-gray-50 dark:bg-gradient-r dark:from-slate-800 dark:to-slate-700 transition-all duration-700 ease-in-out">
  <!-- Navigation Menu -->
  <nav class="bg-gray-200 dark:bg-gray-900 p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xl font-semibold text-gray-800 dark:text-white">
        Apps
      </div>
      <Navbar />
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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each items as { title, url, imageUrl }}
        <div class="card-container bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl">
          <a href={`/view?url=${encodeURIComponent(url)}`} class="block">
            <img src={imageUrl} alt={title} class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white truncate">{title}</h3>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
</main>
