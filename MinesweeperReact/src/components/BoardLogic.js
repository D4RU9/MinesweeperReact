import { MAX_MINES, MAX_ROWS, MAX_COLUMNS, X_AXYS_DIRECTIONS, Y_AXYS_DIRECTIONS } from "./Constants"

export const setMines = () => {
    const minesCoordinates = []
    for (let mine = 0; minesCoordinates.length < MAX_MINES; mine++) {
      const rowIndex = Math.floor(Math.random() * MAX_ROWS)
      const columnIndex = Math.floor(Math.random() * MAX_COLUMNS)
      const mineCoordinate = getTileCoordinate(rowIndex, columnIndex)
      
      if (!minesCoordinates.includes(mineCoordinate)) {
        minesCoordinates.push(mineCoordinate) 
      }    
    }
    return minesCoordinates
  }

  export const getTileCoordinate = (rowIndex, columnIndex) => {
    return rowIndex.toString() + "-" + columnIndex.toString() // `${rowIndex}-${colIndex}`
  }

export function isValidCell(row, column) {
    return row >= 0 && row < MAX_ROWS && column >= 0 && column < MAX_COLUMNS
}

export const countAdjacentMines = (minesCoordinates, row, column) => {
    //const ROWS = minedBoard.length
    //const COLUMNS = minedBoard[0].length;
    let mineCount = 0

    for (let direction = 0; direction < X_AXYS_DIRECTIONS.length; direction++) {
      const newRow = row + X_AXYS_DIRECTIONS[direction]
      const newColumn = column + Y_AXYS_DIRECTIONS[direction]
      const newCoordinate = newRow.toString() + "-" + newColumn.toString()

      if (isValidCell(newRow, newColumn, MAX_ROWS, MAX_COLUMNS) && minesCoordinates.includes(newCoordinate)) {
          mineCount++
      }
    }
    return mineCount === 0 ? null : mineCount
  }





