<script lang="ts">
  export let icon: string
  // Indicate that current application is focused
  export let active = false
  // Indicate that current application is open (show indicator)
  export let open = false
  export let hideIndicator = false
</script>

<div class="w-12 h-12 relative">
  <button
    on:click
    class="m-1 p-2 bg-transparent rounded-md hover:(bg-white bg-opacity-7)"
    class:active
    class:open={open && !hideIndicator}
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={icon} class="transform transition-transform" />
  </button>
  {#if !hideIndicator}
    <div class="absolute bottom-0 mb-1.5 w-full flex flex-row justify-center">
      <div
        class="h-0.75 rounded-full transition-all duration-300"
        class:indicator-empty={!open}
        class:indicator-active={open && active}
        class:indicator-inactive={open && !active}
      />
    </div>
  {/if}
</div>

<style>
  .indicator-empty {
    @apply w-0;
  }
  .indicator-active {
    @apply w-3.5 bg-[#56BFF8];
  }
  .indicator-inactive {
    @apply w-1.5 bg-white bg-opacity-50;
  }
  .active {
    @apply bg-white bg-opacity-7;
  }
  .open {
  }
  button:hover {
    box-shadow: inset 0px 1px 2px -2px white;
  }
  button:active > img {
    @apply scale-75;
  }
</style>
