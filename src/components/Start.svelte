<script lang="ts">
  import { fly } from 'svelte/transition'
  import Icon from '@iconify/svelte'
  import { clickOutside } from '$lib/actions'
  import { createEventDispatcher } from 'svelte'

  // your script goes here
  let showPowerSettings = false

  const dispatch = createEventDispatcher<{ close: void }>()
</script>

<div
  in:fly={{ y: 300, duration: 200 }}
  out:fly={{ y: 300, duration: 200 }}
  class="window flex flex-col rounded-lg w-[400px] min-h-100 absolute left-[50%] ml-[-200px] bottom-16 z-50"
  use:clickOutside={() => {
    dispatch('close')
  }}
>
  <header class="p-8 text-white">
    <div class="relative rounded-md border-b-2 border-b-[#63BBE9]">
      <input
        type="text"
        class="rounded-md bg-[#202221] border border border-[#393A3C] w-full h-10 pl-10 text-sm placeholder-[#ddd]"
        placeholder="Type here to search"
      />
      <Icon icon="fluent:search-16-regular" hFlip={true} class="absolute left-0 h-5 w-5 top-3 left-3" />
    </div>
  </header>
  <main class="flex-1" />
  <footer
    class="text-white text-xs bg-black bg-opacity-10 h-16 border-t border-white border-opacity-20 flex flex-row items-center px-16 gap-3"
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="profile.jpg" class="h-8 w-8 rounded-full" />
    <p class="flex-1">Emanuele Pavanello</p>
    <button
      class="relative p-3 w-11 h-11 rounded-md hover:(bg-white bg-opacity-5)"
      on:click={() => {
        showPowerSettings = !showPowerSettings
        console.log('Self')
      }}
    >
      <Icon icon="fluent:power-20-filled" class="h-5 w-5" />
      {#if showPowerSettings}
        <ul
          in:fly={{ y: 50, opacity: 0, duration: 150 }}
          out:fly={{ y: 50, opacity: 0, duration: 150 }}
          class="window no-transparency rounded-lg absolute bottom-full left-0"
          use:clickOutside={() => {
            showPowerSettings = false
          }}
          on:click|stopPropagation
        >
          <li><Icon icon="bytesize:moon" hFlip={true} class="h-5 w-5" /> Sleep</li>
          <li>
            <Icon icon="fluent:power-20-filled" class="h-5 w-5" /> Shut down
          </li>
          <li><Icon icon="codicon:debug-restart" class="h-5 w-5" /> Restart</li>
        </ul>
      {/if}
    </button>
  </footer>
</div>

<style>
  li {
    @apply flex flex-row items-center gap-2 px-4 py-1 whitespace-nowrap rounded-md m-1 hover:(bg-white bg-opacity-5);
  }
</style>
