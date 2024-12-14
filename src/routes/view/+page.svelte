<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';

    // Server list for random selection
    const Servers = [
        'https://powayusd-production.up.railway.app/a/',
    ];

    // Precalculated URLs for some known URLs
    const precalculatedUrls: { [key: string]: string } = {
        'https://google.com': 'hvtrs8%2F-gmoelg.aoo',
    };

    // Select a random server from the list
    const randomNumber = Math.floor(Math.random() * Servers.length);
    const server = Servers[randomNumber];

    let urlParam: string | null = null;
    let iframeSrc: string | null = null;
    let MetaData: any;
    let isLoading = true; // Track the loading state

    // Function to parse and fetch URL param asynchronously
    async function fetchUrlParam() {
        if (typeof window !== 'undefined' && window.location.href) {
            const href = window.location.href;
            if (isValidUrl(href)) {
                try {
                    const url = new URL(href);
                    urlParam = url.searchParams.get('url');
                } catch (e) {
                    console.error("Error parsing URL:", e);
                    urlParam = 'Invalid URL format';
                }
            } else {
                urlParam = 'Invalid URL';
            }

            // Initialize iframe source URL
            if (urlParam) {
                iframeSrc = server + (getPrecalculatedUrl(urlParam) || getCachedUrl(urlParam) || encode(urlParam));
            }
        }

        isLoading = false; // Set loading to false after iframe is ready
    }

    // Lazy load the MetaData component
    async function loadMetaData() {
        MetaData = (await import('$lib/scriptinjection.svelte')).default;
    }

    onMount(async () => {
        await fetchUrlParam();
        await loadMetaData();
    });

    afterUpdate(() => {
        // If you need to perform any updates after changes, handle them here
    });

    // Utility function to validate a URL
    function isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // Encode function for obfuscating URLs (can be adjusted as per need)
    function encode(str: string) {
        if (!str) return str;
        return encodeURIComponent(
            str.split('')
                .map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char)
                .join('')
        );
    }

    // Cache the encoded URL in localStorage
    function cacheUrl(originalUrl: string, encodedUrl: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`encoded_url_${originalUrl}`, encodedUrl);
        }
    }

    // Get the cached URL from localStorage
    function getCachedUrl(originalUrl: string): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(`encoded_url_${originalUrl}`);
        }
        return null;
    }

    // Get precalculated URL if available
    function getPrecalculatedUrl(originalUrl: string): string | null {
        return precalculatedUrls[originalUrl] || null;
    }

    // Main function to handle input and change iframe URL
    function changeIframeUrl() {
        let inputUrl = (document.getElementById('urlInput') as HTMLInputElement).value;

        // Check if the input URL is missing the protocol and add 'https://'
        if (inputUrl && !inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
            inputUrl = 'https://' + inputUrl;
        }

        // If the input is a valid URL, process it as a URL
        if (inputUrl && isValidUrl(inputUrl)) {
            urlParam = inputUrl;
            const encodedUrl = encode(inputUrl); // Encode the URL
            cacheUrl(inputUrl, encodedUrl);
            iframeSrc = server + (getPrecalculatedUrl(urlParam ?? '') || getCachedUrl(urlParam ?? '') || encodedUrl);
            isLoading = false; // Stop loading when the iframe source is set
        } else {
            alert('Please enter a valid URL');
        }
    }
</script>

<!-- Fixed Menu Bar at the Top -->
<div class="bg-gray-900 shadow-md text-white p-2 fixed w-full top-0 z-10 flex justify-between items-center">
    <a href="/" class="text-3xl font-mono">Home</a>
    <div class="flex items-center space-x-3">
        <input id="urlInput" type="text" placeholder="Enter URL" class="px-4 py-2 text-white bg-slate-950 rounded-sm w-96" />
        <button on:click={changeIframeUrl} class="bg-blue-950 px-4 py-2 rounded-sm text-white">Go</button>
    </div>
</div>

<!-- Loading Screen (Displayed while iframe is loading) -->
{#if isLoading}
    <div class="absolute top-[3.5rem] left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center text-white">
        <div class="w-12 h-12 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
    </div>
{/if}

<!-- Iframe Container (Displayed once iframeSrc is ready) -->
{#if iframeSrc}
    <div class="absolute top-[3.5rem] left-0 right-0 bottom-0">
        <iframe id="iframe" class="w-full h-full border-none"
            src={iframeSrc} title="Page embed">
            Your browser doesn't support iframes
        </iframe>
    </div>
{/if}

<!-- Lazy-loaded MetaData Component -->
{#if MetaData}
    <MetaData />
{/if}
