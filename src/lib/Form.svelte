<script lang="ts">
  let url = "";

  // Function to check if the string looks like a valid URL with optional protocol
  const isValidUrl = (string: string): boolean => {
    // Regular expression to match a simple valid URL (with or without protocol)
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/i;
    return urlPattern.test(string);
  };

  // Function to ensure the URL has https://
  const addProtocolIfNeeded = (url: string): string => {
    // If the URL doesn't have a protocol, add https://
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    return url;
  };

  // Type the event as SubmitEvent for form submission
  const handleSubmit = (event: SubmitEvent): void => {
    event.preventDefault();

    // If it's not a valid URL, treat it as a Google search query
    if (!isValidUrl(url)) {
      url = `https://google.com/search?q=${encodeURIComponent(url)}`;
    } else {
      // If it's a valid URL, ensure it starts with https://
      url = addProtocolIfNeeded(url);
    }

    // Redirect to the final URL
    window.location.href = `/view?url=${encodeURIComponent(url)}`;
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
      <label for="text" class="block text-gray-800 dark:text-gray-200 font-medium mb-2 transition-all duration-500 ease-in-out">Enter a URL or search:</label>
      <input
        id="url"
        type="text" 
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
        on:click={() => handleQuickLinkClick('https://youtube.com')}
        class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600 transition-all duration-300"
      >
        Youtube
      </button>
      <button
        on:click={() => handleQuickLinkClick('https://duckduckgo.com')}
        class="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-600 transition-all duration-300"
      >
        DuckDuckGo
      </button>
    </div>
  </div>
</div>
