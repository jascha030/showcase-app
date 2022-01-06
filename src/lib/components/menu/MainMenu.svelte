<script lang='ts'>
	import { goto } from '$app/navigation'
</script>

<div class='menu main'>
	<div class='panel actions'>
		<div class='heading'>
			<h1>SHOW<span>CASE</span></h1>
		</div>

		<div class='menu-list'>
			<ul>
				<li on:click={() => goto('/editor')}>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8' fill='none' viewBox='0 0 24 24'
						 stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
							  d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' />
					</svg>
					<span>New presentation</span>
				</li>
				<li on:click={() => goto('/editor')}>
					<svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8' fill='none' viewBox='0 0 24 24'
						 stroke='currentColor'>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
							  d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' />
					</svg>

					<span>Open presentation</span>
				</li>
			</ul>
		</div>
	</div>
	<div class='panel context'>

	</div>
</div>

<style lang='scss'>
  .menu {
    @apply w-screen h-screen flex flex-row;

    .panel {
      @apply p-12 pt-24;

	  &.actions {
		@apply basis-1/3;

        .heading {
          @apply text-white drop-shadow-sm;

          h1 {
            @apply text-7xl mb-24 font-extrabold italic;

			span {
			  @apply font-bold;

			  color: #EA1479;
			}
          }
        }
      }

      &.context {
        @apply basis-2/3 bg-slate-100;
      }
    }

    &-list {
      @apply text-left text-2xl;

      ul {
        @apply text-left text-slate-300;

        li {
          @apply my-16 cursor-pointer transition-all duration-100 ease-in-out flex;

          &:hover {
            @apply text-slate-100;

            svg {
              @apply mr-6;
            }
          }

          svg {
            @apply transition-all duration-100 ease-in-out mr-4;
          }
        }
      }
    }
  }
</style>
