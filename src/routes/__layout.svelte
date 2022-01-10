<script>
	import '../tailwind.css'
	import { onMount } from 'svelte';
	import { page } from '$app/stores'

	const { ipcRenderer } = window.require('electron')

	let ready = false;
	onMount(() => (ready = true));

	let current;
	page.subscribe((data) => {
		current = data.url.pathname.replace('/', '');
	})

	onMount(() => {
		ipcRenderer.on('fileopened', (_event, { path, content }) => {
			console.log({ _event, path, content });
		})
	})
</script>

<!--suppress CheckEmptyScriptTag -->
<div class="dragbar { current }">
	<div class='dragbar-utils'>
	</div>
	<div class='dragbar-title'>
		<p>{ current }</p>
	</div>
	<div class='dragbar-extra'>
	</div>
</div>

{#if ready}
	<slot />
{/if}

<style lang='scss'>
	.dragbar {
		@apply border-b bg-background border-b-excluded grid grid-cols-3 flex align-middle items-center text-slate-200;

	  	&.presentation {
		  display: none;
		}

		-webkit-app-region: drag;
		position: absolute;
		z-index: 100;
		height: 40px;
		width: 100%;

		&-utils, &-title, &-extra {
		  @apply flex justify-center;
		}
	}
</style>
