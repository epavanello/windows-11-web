<script>
  import { fly } from 'svelte/transition'

  // your script goes here
</script>

<div
  in:fly={{ y: 300, duration: 200 }}
  out:fly={{ y: 300, duration: 200 }}
  class="window flex flex-col rounded-lg w-[600px] min-h-60 absolute left-[50%] ml-[-300px] bottom-16"
>
  <main class="flex-1" />
  <footer class="bg-black bg-opacity-10 h-16 border-t border-white border-opacity-20" />
</div>
