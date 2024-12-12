<script lang="ts">
    import MetaData from '$lib/scriptinjection.svelte'
    import { onMount } from 'svelte';

    //Constant hostname
    let host = window.location.protocol + "//" + window.location.host;

    // A constant array of servers. Using const is optimal as we don't mutate it.
    const Servers = [
        'https://powayusd-production.up.railway.app/a/',
    ];

    // Pre-calculated encoded URLs for quick lookup (add your pre-encoded URLs here)
    const precalculatedUrls: { [key: string]: string } = {
        'https://google.com': 'hvtrs8%2F-gmoelg.aoo',
        'https://1v1.lol': 'hvtrs8%2F-1t1%2Clml',
        'https://youtube.com': 'hvtrs8%2F-ymuvu%60e%2Ccmm',
        host : '',

    };

    // Select random server when the script runs, no need to recompute this on each reactivity cycle.
    const randomNumber = Math.floor(Math.random() * Servers.length);
    const server = Servers[randomNumber];

    let urlParam: string | null = null;
    let isUrlReady = false;  // Flag to check if URL is ready for use

    onMount(() => {
        // We don't need to run on every reactivity cycle; only run onMount
        if (typeof window !== 'undefined' && window.location.href) {
            const href = window.location.href;

            // Ensure the href is valid and parse it only once.
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
        } else {
            console.error("Window is not defined or location.href is missing");
            urlParam = 'No URL available';
        }

        // Cache the encoded URL if it's valid and not cached already
        if (urlParam && !getCachedUrl(urlParam)) {
            const encodedUrl = encode(urlParam);
            cacheUrl(urlParam, encodedUrl);
        }

        // Set the flag once the URL processing is done
        isUrlReady = true;
    });

    function isValidUrl(url: string): boolean {
        try {
            new URL(url);  // Using the URL constructor to check validity
            return true;
        } catch {
            return false;
        }
    }

    // Improved encode function
    function encode(str: string) {
        if (!str) return str;
        // Efficient encoding mechanism (no redundant map operation)
        return encodeURIComponent(
            str.split('')
                .map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char)
                .join('')
        );
    }

    // Function to cache the encoded URL in localStorage
    function cacheUrl(originalUrl: string, encodedUrl: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(`encoded_url_${originalUrl}`, encodedUrl);
        }
    }

    // Function to retrieve cached URL
    function getCachedUrl(originalUrl: string): string | null {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(`encoded_url_${originalUrl}`);
        }
        return null;
    }

    // Function to check if the URL is in the pre-calculated list
    function getPrecalculatedUrl(originalUrl: string): string | null {
        return precalculatedUrls[originalUrl] || null;
    }
</script>

{#if isUrlReady}
    <iframe
        src={server + (getPrecalculatedUrl(urlParam ?? '') || getCachedUrl(urlParam ?? '') || encode(urlParam ?? ''))}
        title="Page embed"
        style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"
    >
        Your browser doesn't support iframes
    </iframe>
{/if}

<MetaData />

