<script lang="ts">
	import type SlideData from '$lib/models/slide/SlideData';
	import { BackgroundType, SlideLayout, SlotContentType, SlidePanel } from '$lib/models/slide/SlideData';
	import Slide from '$lib/components/slide/Slide.svelte';
	import SlideContainer from '$lib/components/slide/SlideContainer.svelte';
	import { getContext } from 'svelte';

	const panel: SlidePanel = {
		backgroundType: BackgroundType.None,
		primary: true,
		slot: {
			contentType: SlotContentType.Text,
			content: "Test 123"
		}
	}

	const slides: SlideData[] = [
		{
			background: '',
			content: [panel],
			layout: SlideLayout.Single,
			title: 'Test1'
		},
		{
			background: '',
			content: [panel],
			layout: SlideLayout.Single,
			title: 'Test2'
		},
	];
</script>

<main>
	<SlideContainer>
		{#each slides as slideContent, i}
			<Slide slideData={Object.assign(slideContent, {index: getContext('SetIndex').index()})} />
		{/each}
	</SlideContainer>
</main>

<style lang='scss'>
</style>
