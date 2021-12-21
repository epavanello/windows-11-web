<script lang="ts">
  import 'virtual:windi.css'
  import '$styles/styles.css'

  import Desktop from '$components/Desktop.svelte'
  import Dock from '$components/Dock.svelte'
  import DockIcon from '$components/DockIcon.svelte'
  import Start from '$components/Start.svelte'
  import Window from '$components/Window.svelte'

  let startIsOpen = false

  interface Program {
    name: string
    title: string
    icon: string
    isOpen: boolean
    isMinimized: boolean
    hideIndicator?: boolean
    left: number
    top: number
    elevation: number
  }

  let programs: Program[] = [
    {
      name: 'explorer',
      title: 'File Explorer',
      icon: 'explorer.png',
      isMinimized: false,
      isOpen: false
    },
    {
      name: 'edge',
      title: 'Edge',
      icon: 'edge.png',
      isMinimized: false,
      isOpen: false
    }
  ].map((program, index) => ({
    ...program,
    left: 0,
    top: 0,
    elevation: index + 1
  }))

  function setProgramAsFirst(current: string) {
    const currentElevation = programs.find((program) => program.name === current)?.elevation
    if (typeof currentElevation === 'undefined') {
      return
    }

    programs.forEach((program) => {
      if (program.name == current) {
        program.elevation = programs.length
      } else {
        program.elevation = program.elevation > currentElevation ? program.elevation - 1 : program.elevation
      }
    })

    programs = programs
  }

  function areEquals(p1: Program, p2: Program) {
    return p1.name == p2.name
  }

  let activeProgram: Program | undefined
  $: {
    activeProgram = [...programs]
      .sort((p1, p2) => p2.elevation - p1.elevation)
      .find((program) => program.isOpen && !program.isMinimized)
  }
</script>

<Desktop />
<main class="h-full w-full overflow-hidden absolute left-0 top-0">
  {#each programs as program (program.name)}
    {#if program.isOpen && !program.isMinimized}
      <Window
        title={program.title}
        icon={program.icon}
        isActive={activeProgram && areEquals(activeProgram, program)}
        elevation={program.elevation}
        bind:left={program.left}
        bind:top={program.top}
        on:close={() => {
          program.isOpen = false
          program.isMinimized = false
        }}
        on:focus={() => {
          setProgramAsFirst(program.name)
        }}
        bind:minimized={program.isMinimized}
      />
    {/if}
  {/each}

  {#if startIsOpen}
    <Start
      on:close={() => {
        startIsOpen = false
      }}
    />
  {/if}

  <Dock>
    <DockIcon
      icon="start.png"
      open={startIsOpen}
      hideIndicator={true}
      on:click={() => {
        startIsOpen = !startIsOpen
      }}
    />
    {#each programs as program (program.name)}
      <DockIcon
        icon={program.icon}
        open={program.isOpen}
        active={activeProgram && areEquals(activeProgram, program)}
        hideIndicator={program.hideIndicator}
        on:click={() => {
          if (activeProgram && areEquals(activeProgram, program)) {
            program.isMinimized = true
          } else {
            console.log('clicked')
            program.isMinimized = false
            setProgramAsFirst(program.name)
            program.isOpen = true
          }
        }}
      />
    {/each}
  </Dock>
</main>
