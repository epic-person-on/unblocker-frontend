<script lang="ts">
    let url = "";
  
    // Type the event as SubmitEvent for form submission
    const handleSubmit = (event: SubmitEvent): void => {
      event.preventDefault();
      console.log(url); // Handle URL submission logic
      window.location.href = '/view?url=' + url;
    };
  
    // Function to handle clicking a quick link
    const handleQuickLinkClick = (link: string) => {
      url = link;
    };
  </script>
  
  <div class="w-full max-w-sm bg-gray-200 dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out">
    <!-- Form -->
    <form on:submit={handleSubmit} class="space-y-4">
      <!-- Input Field for URL -->
      <div>
        <label for="url" class="block text-gray-800 dark:text-gray-200 font-medium mb-2 transition-all duration-500 ease-in-out">Enter a URL:</label>
        <input
          id="url"
          type="url"
          bind:value={url}
          placeholder="https://example.com"
          class="w-full p-3 border border-gray-500 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-500 ease-in-out"
          required
        />
      </div>
  
      <!-- Submit Button -->
      <div>
        <button type="submit" class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-500 ease-in-out">
          Submit
        </button>
      </div>
    </form>
  
    <!-- Quick Links -->
    <div class="mt-6 space-y-4">
      <p class="text-gray-800 dark:text-gray-200 text-center font-semibold">Quick Links:</p>
      <div class="flex justify-center space-x-4">
        <button
          on:click={() => handleQuickLinkClick('https://google.com')}
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600 transition-all duration-300"
        >
          Google
        </button>
        <button
          on:click={() => handleQuickLinkClick('https://github.com')}
          class="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-all duration-300"
        >
          GitHub
        </button>
        <button
          on:click={() => handleQuickLinkClick('https://svelte.dev')}
          class="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600 transition-all duration-300"
        >
          Svelte
        </button>
      </div>
    </div>
  </div>
  