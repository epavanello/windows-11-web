<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte'
  import { fly, scale } from 'svelte/transition'
  // search icons herehttps://icon-sets.iconify.design/
  import Icon from '@iconify/svelte'
  import { draggable } from 'svelte-drag'

  let width: number = 300
  let height: number = 300
  export let title: string
  export let icon: string = ''
  export let isActive = false
  export let elevation: number

  export let left = 0
  export let top = 0

  export let minimized = false

  const dispatch = createEventDispatcher<{ close: void; minimize: void; focus: void }>()

  if (left == 0 && top == 0) {
    left = (document.body.clientWidth - width) / 2
    top = (document.body.clientHeight - 48 - height) / 2

    console.log(left, top)
  }

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
    style="z-index: {10 + elevation}; width: {width}px; height: {height}px;"
    on:mousedown={() => dispatch('focus')}
    use:draggable={{
      handle: '.dragger',
      bounds: {},
      defaultPosition: {
        x: left,
        y: top
      }
    }}
    on:svelte-drag:end={(e) => {
      left = e.detail.offsetX
      top = e.detail.offsetY
    }}
  >
    <header class="dragger min-h-7 flex flex-row items-center gap-2 pl-2 text-white">
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
    <main class="w-full h-full">
      <h1 class="mt-20 text-center text-xl text-white">WIP 😉</h1>
    </main>
  </div>
</div>

<style>
  .action-button {
    @apply w-11 hover:(bg-white bg-opacity-10);
  }
</style>
