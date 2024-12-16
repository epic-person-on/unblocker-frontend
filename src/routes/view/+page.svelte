<script lang="ts">
    import { Spinner } from 'flowbite-svelte';
    import { onMount, afterUpdate, type Component } from 'svelte';

    const Servers = [
        'https://powayusd-production.up.railway.app/a/',
    ];

    const precalculatedUrls: { [key: string]: string } = {
        'https://google.com': 'hvtrs8%2F-gmoelg.aoo',
    };

    const randomNumber = Math.floor(Math.random() * Servers.length);
    const server = Servers[randomNumber];
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
        // biome-ignore lint/style/useConst: <explanation>
        let inputUrl = (document.getElementById('urlInput') as HTMLInputElement).value;


        if (!isValidUrl(inputUrl)) {
            urlParam=inputUrl;
            const encodedUrl = encode(`https://google.com/search?q=${inputUrl}`);
            cacheUrl(`https://google.com/search?q=${inputUrl}`, encodedUrl)
            iframeSrc = server + (getPrecalculatedUrl(urlParam ?? '') || getCachedUrl(urlParam ?? '') || encodedUrl);

        } else {
            urlParam = addProtocolIfNeeded(inputUrl.trim());
            const encodedUrl = encode(urlParam);
            cacheUrl(inputUrl, encodedUrl);
            iframeSrc = server + (getPrecalculatedUrl(urlParam ?? '') || getCachedUrl(urlParam ?? '') || encodedUrl);
            isLoading = false;

        }
    }

    // Handler to be called when iframe finishes loading
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
    <div class="absolute top-[3.5rem] left-0 right-0 bottom-0 bg-gray-800 bg-opacity-75 flex justify-center items-center text-white">
        <Spinner color="blue" class="w-12 h-12" />
        <br>
        <p class="text-3xl">Loading...</p>
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
