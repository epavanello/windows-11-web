<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { fly, scale } from 'svelte/transition'
  // search icons herehttps://icon-sets.iconify.design/
  import Icon from '@iconify/svelte'

  let width: number = 300
  let height: number = 200
  export let title: string
  export let icon: string = ''
  export let isActive = false
  export let elevation: number

  export let left = 0
  export let top = 0

  let windowWidth = 0
  let windowHeight = 0
  let containerWidth = 0
  let containerHeight = 0

  let moving = false
  export let minimized = false

  const dispatch = createEventDispatcher<{ close: void; minimize: void; focus: void }>()

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
    if (left == 0 && top == 0) {
      left = (windowWidth - containerWidth) / 2
      top = (windowHeight - 48 - containerHeight) / 2
    }
  })

  function flyIfMinimized(node: HTMLElement, params: { minimized: boolean }) {
    if (true) {
      return fly(node, { duration: 200, opacity: 0, y: 50 })
    }
    return {}
  }
</script>

<div out:flyIfMinimized={{ minimized }}>
  <div
    transition:scale={{ duration: 200, opacity: 0, start: 0.8 }}
    class="window rounded-lg absolute"
    class:z-10={isActive}
    style="left: {left}px; top: {top}px; z-index: {10 + elevation};"
    bind:clientWidth={containerWidth}
    bind:clientHeight={containerHeight}
    on:mousedown={() => dispatch('focus')}
  >
    <header class="min-h-7 flex flex-row items-center gap-2 pl-2 text-white" on:mousedown={onMouseDown}>
      {#if icon}
        <!-- svelte-ignore a11y-missing-attribute -->
        <img class="h-4 w-4" src={icon} />
      {/if}
      <p class="text-xs flex-1 items-center">{title}</p>
      <div class="flex flex-row h-7">
        <button
          class="action-button"
          on:click={() => {
            minimized = true
            dispatch('minimize')
          }}
        >
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
      bind:clientWidth={width}
      bind:clientHeight={height}
      style={`height: 1px; resize: both; min-width: ${width}px; min-height: ${height}px`}
    >
      <h1 class="mt-20 text-center text-xl text-white">WIP 😉</h1>
    </main>
  </div>
</div>

<svelte:window
  on:mouseup={onMouseUp}
  on:mousemove={onMouseMove}
  bind:innerWidth={windowWidth}
  bind:innerHeight={windowHeight}
/>

<style>
  .action-button {
    @apply w-11 hover:(bg-white bg-opacity-10);
  }
</style>
