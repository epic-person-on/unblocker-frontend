<script>
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Analytics from '$lib/analytics.svelte';
	import Scriptinjection from '$lib/scriptinjection.svelte';
	injectSpeedInsights();
	let { children } = $props();
</script>

<Scriptinjection />
<Analytics />
{@render children()}
