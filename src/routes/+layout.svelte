<script>
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import Scriptinjection from '$lib/scriptinjection.svelte';
	injectSpeedInsights();
	// biome-ignore lint/style/useConst: Poo Poo
	let { children } = $props();
</script>

<Scriptinjection />
{@render children()}
