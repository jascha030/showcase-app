<script lang='ts'>
	import { goto } from '$app/navigation';
</script>

<div class='editor'>
	<h1>Editor</h1>
	<button on:click={() => goto('/')}>Menu</button>
</div>


<style lang='scss'>
	.editor {
	  @apply absolute flex text-white flex-row p-12;

	  top: 48px;
	  left:0;
	  right:0;
	  bottom:0;

	  h1 {
		@apply text-2xl;
	  }
	}
</style>
