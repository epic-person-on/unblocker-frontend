<script lang="ts">
    import { onMount } from 'svelte';

    // A constant array of servers. Using const is optimal as we don't mutate it.
    const Servers = [
        'https://powayusd-production.up.railway.app/a/',
    ];

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
</script>

{#if isUrlReady}
    <iframe
        src={server + encode(urlParam ?? '')}
        title="Page embed"
        style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;"
    >
        Your browser doesn't support iframes
    </iframe>
{/if}
