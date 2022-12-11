export enum ELEMENTS_IDS {
  ROOT_ID = 'root',
}

export const WS_URL = 'ws://localhost:8080'

export const CELL_SIZE = 10
export const ANIMATION_DURATION = 100

export const setCssConst = (
  boardWidth: number,
  boardHeight: number,
  animationDuration: number = ANIMATION_DURATION,
  cellSize: number = CELL_SIZE,
): void => {
  const root = document.documentElement

  root.style.setProperty('--d-board-width', `${boardWidth}`)
  root.style.setProperty('--d-board-height', `${boardHeight}`)
  root.style.setProperty('--d-cell-size', `${cellSize}px`)
  root.style.setProperty('--a-duration', `${animationDuration}ms`)

  // mobile 100vh fix
  document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`)
}
