import { MAX_ROWS, MAX_COLUMNS } from "./Constants"

export const createBoard = (value) => {
  return Array.from({ length: MAX_ROWS }, () => Array(MAX_COLUMNS).fill(value))
}

export const getTileCoordinate = (rowIndex, columnIndex) => {
  return rowIndex.toString() + "-" + columnIndex.toString() // `${rowIndex}-${colIndex}`
}

export const isValidCell = (rowIndex, columnIndex) => {
  return rowIndex >= 0 && rowIndex < MAX_ROWS && columnIndex >= 0 && columnIndex < MAX_COLUMNS
}

// Recursive function: if the mapped row is an array, then it calls itself providing the row, and then copies the row values one at a time (Matrix)  
export function cloneBoard(board) {
  return board.map(row => Array.isArray(row) ? cloneBoard(row) : row)
}


