// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { SpeedInsights } from '@vercel/speed-insights/sveltekit';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
export const handle = SpeedInsights();
