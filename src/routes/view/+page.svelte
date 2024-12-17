<script lang="ts">
    import { Spinner } from 'flowbite-svelte';
    import { onMount, afterUpdate, type Component } from 'svelte';
    
    // Import the JSON file
    import precalculatedUrlsData from '$lib/precalculatedUrls.json';

    // Precalculated URLs loaded from the JSON file
    const precalculatedUrls: { [key: string]: string } = precalculatedUrlsData;

    const Servers = [
        'https://powayusd-production.up.railway.app/a/',
    ];

    const randomNumber = Math.floor(Math.random() * Servers.length);
    const server = Servers[randomNumber];
    
    // Function to check if the string looks like a valid URL with optional protocol
    const isValidUrl = (string: string): boolean => {
        const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z0-9]{2,}(\/[^\s]*)?$/i;
        return urlPattern.test(string);
    };

    // Function to ensure the URL has https://
    const addProtocolIfNeeded = (url: string): string => {
        if (!/^https?:\/\//i.test(url)) {
            return `https://${url}`;
        }
        return url;
    };

    let urlParam: string | null = null;
    let iframeSrc: string | null = null;
    let MetaData: Component;
    let isLoading = true;

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

            if (urlParam) {
                iframeSrc = server + (getPrecalculatedUrl(urlParam) || getCachedUrl(urlParam) || encode(urlParam));
            }
        }

        isLoading = false;
    }

    async function loadMetaData() {
        MetaData = (await import('$lib/scriptinjection.svelte')).default;
    }

    onMount(async () => {
        await fetchUrlParam();
        await loadMetaData();
    });

    afterUpdate(() => {
        // Handle any updates after changes here
    });

    function encode(str: string) {
        if (!str) return str;
        return encodeURIComponent(
            str.split('')
                .map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char)
                .join('')
        );
    }

    function cacheUrl(originalUrl: string, encodedUrl: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`encoded_url_${originalUrl}`, encodedUrl);
        }
    }

    function getCachedUrl(originalUrl: string): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(`encoded_url_${originalUrl}`);
        }
        return null;
    }

    function getPrecalculatedUrl(originalUrl: string): string | null {
        return precalculatedUrls[originalUrl] || null;
    }

    function changeIframeUrl() {
        // biome-ignore lint/style/useConst: Its not broken so don't fix it
        let inputUrl = (document.getElementById('urlInput') as HTMLInputElement).value;

        if (!isValidUrl(inputUrl)) {
            urlParam = inputUrl;
            const encodedUrl = encode(`https://google.com/search?q=${inputUrl}`);
            cacheUrl(`https://google.com/search?q=${inputUrl}`, encodedUrl);
            iframeSrc = server + (getPrecalculatedUrl(urlParam ?? '') || getCachedUrl(urlParam ?? '') || encodedUrl);
        } else {
            urlParam = addProtocolIfNeeded(inputUrl.trim());
            const encodedUrl = encode(urlParam);
            cacheUrl(inputUrl, encodedUrl);
            iframeSrc = server + (getPrecalculatedUrl(urlParam ?? '') || getCachedUrl(urlParam ?? '') || encodedUrl);
            isLoading = false;
        }
    }

    function handleIframeLoad() {
        isLoading = false;
    }
</script>

<!-- Fixed Menu Bar at the Top -->
<div class="bg-gray-900 shadow-md text-white p-2 fixed w-full top-0 z-10 flex justify-between items-center">
    <a href="/" class="text-3xl font-mono">Home</a>
    <div class="flex items-center space-x-3">
        <input id="urlInput" type="text" placeholder="Enter URL or search" class="px-4 py-2 text-white bg-gradient-to-r from-slate-950 to-slate-900 rounded-sm w-96" />
        <button on:click={changeIframeUrl} class="bg-blue-950 px-4 py-2 rounded-sm text-white">Go</button>
    </div>
</div>

<!-- Loading Screen (Displayed while iframe is loading) -->
{#if isLoading}
    <div class="absolute top-[3.5rem] left-0 right-0 bottom-0 bg-slate-950 bg-opacity-75 flex justify-center items-center text-white">

        <div role="status">
            <svg aria-hidden="true" class="inline w-8 h-8 text-slate-500 animate-spin dark:text-slate-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>

    </div>
{/if}

<!-- Iframe Container (Displayed once iframeSrc is ready) -->
{#if iframeSrc}
    <div class="absolute top-[3.5rem] left-0 right-0 bottom-0">
        <iframe id="iframe" class="w-full h-full border-none"
            src={iframeSrc} title="Page embed" on:load={handleIframeLoad}>
            Your browser doesn't support iframes
        </iframe>
    </div>
{/if}

<!-- Lazy-loaded MetaData Component -->
{#if MetaData}
    <MetaData />
{/if}
