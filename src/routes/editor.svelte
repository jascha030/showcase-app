<script lang='ts'>
	import SlideData, { BackgroundType, SlideLayout, SlidePanel, SlotContentType } from '$lib/models/slide/SlideData';

	let current: number = 0;

	const panel: SlidePanel = {
		backgroundType: BackgroundType.None,
		primary: true,
		slot: {
			contentType: SlotContentType.Text,
			content: 'Test 123',
		},
	};

	const slides: SlideData[] = [
		{
			background: 'white',
			content: [{
				backgroundType: BackgroundType.None,
				primary: true,
				slot: {
					contentType: SlotContentType.Text,
					content: 'Test 123',
				},
			}],
			layout: SlideLayout.Single,
			title: 'Test1',
		}
	];

	const css = 'selected-slide';

	const getSlideCSS = (slide: SlideData, index: number): string => {
		const active: string = index === current ? ' active' : '';

		return `${css} ${slide.layout}${active}`;
	};
</script>

<div class='editor'>
	{#each slides as slide, index}
		<div class={ getSlideCSS(slide, index) } style={ slide.background !== '' ? `background: ${slide.background}`: ''}>
			{#each slide.content as panel, index}
				<div class='panel'>
					{#if index === 0}
						<div class='content title'>
							<textarea rows='1' class='edit' bind:value={ slide.title } />
						</div>
					{/if}

					<div class='content main'>
						<textarea class='edit' bind:value={ panel.slot.content } />
					</div>
				</div>
			{/each}
		</div>
	{/each}
</div>


<style lang='scss'>
  .editor {
    @apply bg-disabled absolute text-white p-12 bottom-0 right-1/4;

    top: 40px;
    left: 0;

    h1 {
      @apply text-2xl;
    }
  }

  .selected-slide {
    @apply h-auto w-auto rounded-md top-12 left-12 right-12 aspect-video drop-shadow-lg;

    &:not(.active) {
      display: none;
    }

    &.active {
      &.center {
        @apply flex flex-col;

        .panel {
        }
      }

      &.dual {
        @apply grid grid-cols-2;

        .panel {
        }
      }

      .panel {
        @apply px-12 py-6 w-full h-full;
      }

      .content {
        @apply flex justify-center my-6;

        &.title {
          @apply basis-1/3;

          .edit {
            @apply font-bold text-4xl;
          }
        }

        &.main {
          @apply basis-2/3;
        }
      }
    }

    .edit {
      @apply transition ease-linear duration-75 border border-4 border-foreground border-dashed h-full w-full p-12 text-center bg-transparent outline-0;

      &:hover {
        @apply border-background-highlight cursor-pointer;
      }

      &:active, &:focus {
        @apply border-accent;
      }
    }
  }
</style>
