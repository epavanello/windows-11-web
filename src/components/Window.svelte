<script lang="ts">
  import { onMount } from 'svelte'

  let width: number = 600
  let height: number = 400
  export let title: string
  export let icon: string = ''

  let clientWidth = width
  let clientHeight = height

  let left = 0
  let top = 0

  let windowWidth = 0
  let windowHeight = 0

  let moving = false

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

<div class="window rounded-lg absolute" style="left: {left}px; top: {top}px;">
  <header class="min-h-7 flex flex-row items-center gap-2 px-2 text-white" on:mousedown={onMouseDown}>
    {#if icon}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img class="h-4 w-4" src={icon} />
    {/if}
    <p class="text-xs flex-1">{title}</p>
  </header>
  <main
    bind:clientWidth
    bind:clientHeight
    style={`height: 1px; resize: both; min-width: ${width}px; min-height: ${height}px`}
  />
</div>

<svelte:window
  on:mouseup={onMouseUp}
  on:mousemove={onMouseMove}
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
/>
