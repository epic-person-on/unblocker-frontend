<script context="module" lang="ts">
    declare var gtag: Function;  // Declare global gtag variable
  </script>
  
  <script lang="ts">
    import { page } from '$app/stores'
    
    $: {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-X7PGNLLLD8', {
          page_title: document.title,
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
  <svelte:head>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-X7PGNLLLD8">
    </script>
    <script>
      window.dataLayer = window.dataLayer || []
  
      function gtag() {
        dataLayer.push(arguments)
      }
  
      gtag('js', new Date())
      gtag('config', 'G-X7PGNLLLD8')
    </script>
  </svelte:head>
  