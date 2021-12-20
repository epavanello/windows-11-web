export function clickOutside(element: HTMLElement, callbackFunction: () => void) {
  let skipFirst = false
  function onClick(event: MouseEvent) {
    if (!skipFirst) {
      skipFirst = true
      return
    }
    if (!element.contains(event.target as Node)) {
      callbackFunction()
    }
  }
  function enableOnClick() {}

  document.body.addEventListener('click', onClick)

  element.addEventListener('click', enableOnClick)

  return {
    update(newCallbackFunction: () => void) {
      callbackFunction = newCallbackFunction
    },
    destroy() {
      document.body.removeEventListener('click', onClick)
      element.removeEventListener('click', enableOnClick)
    }
  }
}
