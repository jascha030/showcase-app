<script lang='ts'>
	import { onDestroy, onMount, setContext } from 'svelte';
	import { goto } from '$app/navigation';

	let startIndex = -1;
	let currentIndex = 0;

	const keyBoardListener = (e: KeyboardEvent) => {
		if (e.key === 'ArrowRight') {
			next();
		}

		if (e.key === 'ArrowLeft') {
			prev();
		}

		if (e.key === 'Escape') {
			goto('/editor')
		}
	}

	onMount(() => document.addEventListener('keydown', keyBoardListener));
	onDestroy(() => document.removeEventListener('keydown', keyBoardListener));

	setContext('SetIndex', {
		index: () => {
			startIndex++;
			return startIndex;
		},
		current: () => currentIndex
	});

	const toggleSlideClasses = (direction: NavigateDirection, currentSlide: Element) => {
		const navigatingSlide = direction === NavigateDirection.Next
			? currentSlide.nextElementSibling
			: currentSlide.previousElementSibling;

		currentSlide.classList.remove('translate-x-0');
		currentSlide.classList.add(direction === NavigateDirection.Next ? '-translate-x-full' : 'translate-x-full');

		navigatingSlide.classList.remove(direction === NavigateDirection.Next ? 'translate-x-full' : '-translate-x-full');
		navigatingSlide.classList.add('translate-x-0');
	};

	const mutateIndex = (direction: NavigateDirection): Boolean => {
		if (direction === NavigateDirection.Next) {
			if (currentIndex >= startIndex) {
				return false;
			}

			currentIndex++;
		}

		if (direction === NavigateDirection.Previous) {
			if (currentIndex <= 0) {
				return false;
			}

			currentIndex--;
		}

		return true;
	};

	const navigate = (direction: NavigateDirection) => mutateIndex(direction) && toggleSlideClasses(direction, document.querySelector('.slide.translate-x-0'));
	const next = () => navigate(NavigateDirection.Next);
	const prev = () => navigate(NavigateDirection.Previous);

	enum NavigateDirection {
		Next,
		Previous
	}
</script>

<div class='presentation-container'>
	<div class='slide-nav'>
		<div class='nav-control' on:click={() => goto('/')}>
			<svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		</div>
	</div>

	<div class='slide-container'>
		<slot></slot>
	</div>

	<div class='slide-controls'>
		<div class='presentation-control' on:click={() => prev()}>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-20 w-20' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
					  d='M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z' />
			</svg>
		</div>

		<div class='presentation-display'>
			{ currentIndex + 1 } /
			{#if startIndex === -1}
				0
			{:else}
				{startIndex + 1}
			{/if}
		</div>

		<div class='presentation-control next' on:click={() => next()}>
			<svg xmlns='http://www.w3.org/2000/svg' class='h-20 w-20' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
					  d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z' />
			</svg>
		</div>
	</div>
</div>

<style lang='scss'>
  .presentation-container {
    @apply w-screen h-screen bg-gradient-to-br from-orange-400 to-orange-300 overflow-hidden;

    .slide-container {
      @apply relative;
    }

	.slide-nav {
      @apply absolute left-0 right-0 flex justify-end content-end flex-row h-28;

	  top: 48px;
	  z-index: 100;

	  .nav-control {
        @apply flex transition-all duration-150 ease-in-out basis-1/4 justify-end content-center text-xl text-slate-300 opacity-5 pr-12;

        svg {
          @apply origin-center transition-all duration-150 ease-in-out;
        }

        &:hover {
          @apply text-slate-100 cursor-pointer opacity-100;
        }
      }
	}

    .slide-controls {
      @apply absolute bottom-0 left-0 right-0 flex justify-center content-center flex-row h-28;

      .presentation-display {
        @apply flex content-center justify-center text-2xl text-white pt-8;
      }

      .presentation-control {
        @apply flex transition-all duration-150 ease-in-out grow justify-center content-center text-xl text-slate-300 opacity-5;

        svg {
          @apply origin-center transition-all duration-150 ease-in-out;
        }

        &:hover {
          @apply text-slate-100 cursor-pointer opacity-100;
        }

        &.prev, &.next {
          svg {
            @apply pt-4;
          }
        }

        &.prev {
          &:hover {
            svg {
              @apply pr-4;
            }
          }
        }

        &.next {
          &:hover {
            svg {
              @apply pl-4;
            }
          }
        }
      }
    }
  }
</style>
