<script>
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Scriptinjection from '$lib/scriptinjection.svelte';
	injectSpeedInsights();
	// biome-ignore lint/style/useConst: it it works don't fix it
	let { children } = $props();
</script>

<Scriptinjection />
{@render children()}
