<script>
  let url = 'https://www.pava.me/'
</script>

<div class="h-full w-full flex flex-col items-stretch">
  <input type="text" bind:value={url} />
  <iframe class="flex-1" src={url} frameborder="0" />
</div>
