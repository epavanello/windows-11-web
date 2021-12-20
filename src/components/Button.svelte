<script lang="ts">
  export let type: 'primary' | 'secondary' = 'primary'
</script>

<button on:click class:primary={type == 'primary'} class:secondary={type == 'secondary'}><slot /></button>

<style>
  button {
    @apply rounded-lg text-lg p-2 transform pr-5 pl-5 transition-colors duration-200;
  }
  .primary {
    @apply bg-blue-500 border-blue-300 text-gray-100 hover:bg-blue-400;
  }
  .secondary {
    @apply bg-transparent border-2 border-blue-500 text-blue-500 hover:(bg-blue-500 text-gray-100) focus:border-blue-300 ;
  }
</style>
