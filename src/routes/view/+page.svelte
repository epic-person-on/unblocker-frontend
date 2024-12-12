<script lang="ts">
    import { onMount } from 'svelte';
    var Servers = [
        'https://powayusd-production.up.railway.app/a/',
    ];
    var randomNumber = Math.floor(Math.random()*Servers.length);

    let server = Servers[randomNumber]

    let urlParam: string | null = null;
    let isUrlReady = false;  // Flag to check if URL is ready for use

    onMount(() => {
        // Ensure that window.location.href is available in the browser context
        if (typeof window !== 'undefined' && window.location.href) {
            const href = window.location.href;

            // Ensure the href is not empty and is a valid URL
            if (isValidUrl(href)) {
                try {
                    const url = new URL(href);
                    urlParam = url.searchParams.get('url');
                    if (!urlParam) {
                        urlParam = 'No URL parameter found';
                    }
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

        // Set flag to true once URL processing is done
        isUrlReady = true;
    });

    function isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }

    function encode(str: string) {
        if (!str) return str;
        return encodeURIComponent(
            str
                .toString()
                .split('')
                .map((char, ind) =>
                    ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
                )
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
