<script lang="ts">
  export let icon: string
  // Indicate that current application is focused
  export let active = false
  // Indicate that current application is open (show indicator)
  export let open = false
  export let hideIndicator = false
</script>

<div class="w-12 h-12">
  <button
    on:click
    class="m-1 p-2 bg-transparent rounded-md focus:outline-none hover:(bg-white bg-opacity-7)"
    class:active
    class:open={open && !hideIndicator}
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src={icon} class="transform transition-transform" />
  </button>
</div>

<style>
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
