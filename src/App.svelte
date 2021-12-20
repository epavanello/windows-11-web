<script lang="ts">
  import 'virtual:windi.css'
  import '$styles/styles.css'

  import Desktop from '$components/Desktop.svelte'
  import Dock from '$components/Dock.svelte'
  import DockIcon from '$components/DockIcon.svelte'
  import Start from '$components/Start.svelte'
  import Window from '$components/Window.svelte'
  import { clickOutside } from '$lib/actions'

  let currentFocus: string | null = null

  function getProgramByName(programsToSearch: Program[], name: string): Program | null {
    return programsToSearch.find((program) => program.name === name)
  }

  interface Program {
    name: string
    icon: string
    onOpen: () => void
    isOpen: boolean
    hideIndicator?: boolean
  }
  let programs: Program[] = [
    {
      name: 'Start',
      icon: 'start.png',
      onOpen: () => {
        currentFocus = 'Start'
        getProgramByName(programs, 'Start')!.isOpen = !getProgramByName(programs, 'Start')!.isOpen
        programs = programs
      },
      isOpen: false,
      hideIndicator: true
    },
    {
      name: 'Explorer',
      icon: 'explorer.png',
      onOpen: () => {
        currentFocus = 'Explorer'
        getProgramByName(programs, 'Explorer')!.isOpen = true
        programs = programs
        closeStart()
      },
      isOpen: false
    }
  ]

  function closeStart() {
    getProgramByName(programs, 'Start')!.isOpen = false
    programs = programs
  }

  function onWindowClose() {
    getProgramByName(programs, 'Explorer')!.isOpen = false
    programs = programs
    currentFocus = ''
  }
</script>

<Desktop />
<main class="h-full w-full overflow-hidden absolute left-0 top-0">
  {#if getProgramByName(programs, 'Explorer').isOpen}
    <Window title="File Explorer" icon="explorer.png" on:close={onWindowClose} />
  {/if}

  {#if getProgramByName(programs, 'Start').isOpen}
    <Start
      on:close={() => {
        getProgramByName(programs, 'Start').isOpen = false
        programs = programs
      }}
    />
  {/if}

  <Dock>
    {#each programs as program}
      <DockIcon
        icon={program.icon}
        open={program.isOpen}
        active={currentFocus === program.name}
        hideIndicator={program.hideIndicator}
        on:click={() => {
          currentFocus = program.name
          program.onOpen()
        }}
      />
    {/each}
  </Dock>
</main>
