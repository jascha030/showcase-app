<script lang="ts">
	import type SlideData from '$lib/models/slide/SlideData';
	import { SlideLayout } from '$lib/models/slide/SlideData.js';

	export let data: SlideData;

	const layoutClass = data.layout === SlideLayout.Single ? 'single': 'dual';
</script>

<div class='slide-container'>
	{#each data.content as panel}
		<div class={'panel ' + layoutClass}>
			ewa
		</div>
	{/each}
</div>
