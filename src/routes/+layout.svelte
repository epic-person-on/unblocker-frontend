<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<injectSpeedInsights />