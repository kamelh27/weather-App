export function setViemportSize ($elemento) {
  const vierwportBlockSize = getViewport()
  $elemento.style.blockSize = `${vierwportBlockSize}px`
}

export function getViewport() {
  return window.innerHeight
}

export function onViewportResize (callback) {
  window.addEventListener('resize', callback)
}

export function offViewportResize (callback) {
  window.removeEventListener('resize', callback )
}

export function viewportSize ($elemento) {
  setViemportSize($elemento)

  onViewportResize(() => setViemportSize($elemento))
}