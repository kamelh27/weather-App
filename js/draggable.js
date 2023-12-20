const defaultConfig = {
  open: true,
  debug: true,
  animatable: true
}

export default function draggable ($element, config = defaultConfig) {
  if(!($element instanceof HTMLElement)) {
    return console.warn(`Elemento invalido se esperaba un HTMLElement y se recibió ${$element}`)
  }

  let isOpen = config.open
  let isDragging = false
  const elementReact = $element.getBoundingClientRect()
  const ELEMENT_BLOCK_SIZE = elementReact.height

  const $market = $element.querySelector('[data-marker]')
  const MARKER_BLOCK_SIZE = $market.getBoundingClientRect().height

  const VISIBLE_Y_POSITION = 0
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
  let widgetPosition = VISIBLE_Y_POSITION
  isOpen ? open() : close()

  let startY = 0

  $market.addEventListener('click', handleClick)
  $market.addEventListener('pointerdown', handlePointerDown)
  $market.addEventListener('pointerup', handlePointerUp)
  $market.addEventListener('pointerout', handlePointerOut)
  $market.addEventListener('pointercancel', handlePointerCancel)
  $market.addEventListener('pointermove', handlePointerMove)

  if(config.animatable) {
    setAnimations()
  }
  
  function handlePointerUp() {
    logger('Pointer UP')
    dragEnd()
  }

  function handlePointerOut () {
    logger('Pointer OUT')
    bounce()
  }

  function handlePointerCancel() {
    logger('Pointer CANCEL')
    bounce()
  }

  function handlePointerDown (event) {
    logger('Pointer DOWN')
    startDrag(event)
  }

  function pageY(event) {
    return event.pageY || event.touches[0].pageY
  }

  function startDrag (event) {
    isDragging = true
    startY = pageY(event)
  }
  
  function handlePointerMove(event) {
    logger('Pointer MOVE')
    drag(event)
  }

  function handleClick (event) {
    logger('click')
    toggle(event)
  }

  function setAnimations() {
    $element.style.transition = 'margin-bottom .3s'
  }

  function bounce () {
    if(widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
      return open()
    }
    return close()
  }

  function dragEnd() {
    logger('DRAG END')
    isDragging = false
    bounce()
  }

  function toggle() {
    if(!isDragging) {
      if(!isOpen) {
        open()
      } else {
        close()
      }
    }
  }
  
  function logger(message) {
  if(config.debug) {
    console.info(message)
  }
 }

  function open () {
    logger('Abrir')
    isOpen = true
    widgetPosition = VISIBLE_Y_POSITION
    setWidgetPosition(widgetPosition)
 }

  function close () {
    logger('Cerrar')
    isOpen  = false
    widgetPosition = HIDDEN_Y_POSITION
    setWidgetPosition(widgetPosition)
 }

  function setWidgetPosition (value) {
  $element.style.marginBottom = `-${value}px`
 }

 function drag(event) {
  const cursorY = pageY(event)
  const movementY = cursorY - startY
  widgetPosition += movementY
  startY = cursorY
  if(widgetPosition > HIDDEN_Y_POSITION) {
    return false
  }
  setWidgetPosition(widgetPosition)
 }
}