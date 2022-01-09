<script lang='ts'>
	import type SlideData from '$lib/models/slide/SlideData';
	import { SlideLayout } from '$lib/models/slide/SlideData';

	export let slideData: SlideData;

	$: console.log(slideData)
</script>


<div class='slide {slideData.layout} {slideData.index === 0 ? "translate-x-0" : "translate-x-full" }'>
	<div class='slide-content slide-text'>
		<h1>{slideData.title}</h1>
	</div>

	<!--{#if slideData.layout.includes('img')}-->
	<!--	<div class='slide-content slide-img'>-->
	<!--		<div class='slide-img-content' style='background-image: url({slideData.img})'></div>-->
	<!--	</div>-->
	<!--{/if}-->
</div>

<style lang='scss'>
  .slide {
    @apply absolute inset-0 w-screen h-screen text-white flex transition-all ease-in-out duration-500 transform;

    &.center {
      @apply flex justify-center text-left;
    }

    &.img-right, &.img-left, &.left, &.right {
      @apply grid grid-cols-2;
    }

    .slide-content {
      @apply p-16;

      &.slide-text {
        z-index: 1;
      }

      &.slide-img {
        @apply pt-16 pb-20 flex;
        z-index: 0;

        .slide-img-content {
          @apply transition ease-in-out grow bg-center bg-cover rounded-lg;

          animation: bounce 50s infinite;
        }
      }
    }

    h1 {
      @apply text-8xl font-sans font-bold drop-shadow-sm;
    }
  }

  @keyframes bounce {
    0%, 100% {
      opacity: .9;
      transform: translateY(-2%) translateX(4%);
      animation-timing-function: cubic-bezier(0, 0.4, 2, 1);
    }
    50% {
      opacity: 1;
      transform: translateY(0);
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>
