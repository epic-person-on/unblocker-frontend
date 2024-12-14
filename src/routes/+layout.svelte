<script>
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import '../app.css';
	let { children } = $props();
	injectSpeedInsights();
</script>

{@render children()}

