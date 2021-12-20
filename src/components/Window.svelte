<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { fade, scale } from 'svelte/transition'
  // search icons herehttps://icon-sets.iconify.design/
  import Icon from '@iconify/svelte'

  let width: number = 500
  let height: number = 300
  export let title: string
  export let icon: string = ''

  let clientWidth = width
  let clientHeight = height

  let left = 0
  let top = 0

  let windowWidth = 0
  let windowHeight = 0

  let moving = false

  const dispatch = createEventDispatcher<{ close: void }>()

  function onMouseDown() {
    moving = true
  }

  function onMouseMove(e: MouseEvent) {
    if (moving) {
      left += e.movementX
      top += e.movementY
    }
  }

  function onMouseUp() {
    moving = false
  }

  onMount(() => {
    left = (windowWidth - Math.max(width, clientWidth)) / 2
    top = (windowHeight - Math.max(height, clientHeight)) / 2
  })
</script>

<div
  in:scale={{ duration: 200, opacity: 0, start: 0.8 }}
  out:scale={{ duration: 200, opacity: 0, start: 0.8 }}
  class="window rounded-lg absolute"
  style="left: {left}px; top: {top}px;"
>
  <header class="min-h-7 flex flex-row items-center gap-2 pl-2 text-white" on:mousedown={onMouseDown}>
    {#if icon}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img class="h-4 w-4" src={icon} />
    {/if}
    <p class="text-xs flex-1 items-center">{title}</p>
    <div class="flex flex-row h-7">
      <button class="action-button">
        <Icon icon="codicon:chrome-minimize" />
      </button>
      <button class="action-button">
        <Icon icon="fluent:maximize-16-regular" />
      </button>
      <button
        class="action-button rounded-tr-lg !hover:bg-[#c42b1c]"
        on:click={() => {
          dispatch('close')
        }}
      >
        <Icon icon="fluent:dismiss-16-regular" />
      </button>
    </div>
  </header>
  <main
    bind:clientWidth
    bind:clientHeight
    style={`height: 1px; resize: both; min-width: ${width}px; min-height: ${height}px`}
  >
  <h1 class="mt-20 text-center text-xl text-white">WIP 😉</h1>
</main>
</div>

<svelte:window
  on:mouseup={onMouseUp}
  on:mousemove={onMouseMove}
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
/>

<style>
  .action-button {
    @apply w-11 focus:outline-none hover:(bg-white bg-opacity-10);
  }
</style>
