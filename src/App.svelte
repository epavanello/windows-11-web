<script lang="ts">
  import 'virtual:windi.css'
  import '$styles/styles.css'

  import Desktop from '$components/Desktop.svelte'
  import Dock from '$components/Dock.svelte'
  import DockIcon from '$components/DockIcon.svelte'
  import Start from '$components/Start.svelte'
  import Window from '$components/Window.svelte'

  let startIsOpen = false

  let explorerIsOpen = false

  let currentFocus: string | null = null
</script>

<Desktop />
<main class="h-full w-full overflow-hidden absolute left-0 top-0">
  {#if startIsOpen}
    <Start />
  {/if}

  {#if explorerIsOpen}
    <Window title="Esplora file" icon="explorer.png" />
  {/if}

  <Dock>
    <DockIcon icon="start.png" active={startIsOpen} on:click={() => (startIsOpen = !startIsOpen)} />
    <DockIcon
      icon="explorer.png"
      active={currentFocus == 'explorer'}
      on:click={() => {
        explorerIsOpen = true
        currentFocus = 'explorer'
      }}
    />
  </Dock>
</main>
