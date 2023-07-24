import { useState } from 'react'

import { WinnerModal } from './components/WinnerModal'
//import { TURNS } from './Constants'
//import { checkWinner, checkEndGame } from './Logic/board'
//import { WinnerModal } from './components/WinnerModal'
//import { saveGameStorage, resetGameStorage } from './Storage/StorageLocal'
import { Tile } from './components/Tile'
// import './App.css'

// background: rgb(255,212,122);
// background: radial-gradient(circle, rgba(255,212,122,1) 0%, rgba(118,59,162,1) 100%);

function App () {
  const MAX_ROWS = 10
  const MAX_COLUMNS = 10
  const mines = 10
  const MAX_MINES = 10
  const TILES_TO_CLICK = MAX_ROWS * MAX_COLUMNS - MAX_MINES

  const [tilesClicked, setTilesClicked] = useState(1)
  

  const setMines = () => {
    const minesPlacement = []
    for (let mine = 0; minesPlacement.length < MAX_MINES; mine++) {
      const row = Math.floor(Math.random() * MAX_MINES)
      const column = Math.floor(Math.random() * MAX_MINES)
      const mineCoordinate = row.toString() + "-" + column.toString()
      
      if (!minesPlacement.includes(mineCoordinate)) {
        minesPlacement.push(mineCoordinate) 
      }    
    }
    return minesPlacement
  }


// (10)['0-2', '6-0', '5-9', '6-5', '6-6', '8-9', '2-7', '6-9', '7-2', '2-4']

  const [minesPlacement, setMinesPlacement] = useState(setMines())

  function isValidCell(row, col, numRows, numCols) {
    return row >= 0 && row < numRows && col >= 0 && col < numCols
  }

  const countAdjacentMines = (minesPlacement, row, column) => {
    //const ROWS = minedBoard.length
    //const COLUMNS = minedBoard[0].length;
    let mineCount = 0

    const xAxysDirections = [-1, -1, -1, 0, 0, 1, 1, 1]
    const yAxysDirections = [-1, 0, 1, -1, 1, -1, 0, 1]

    for (let direction = 0; direction < xAxysDirections.length; direction++) {
      const newRow = row + xAxysDirections[direction]
      const newColumn = column + yAxysDirections[direction]
      const newCoordinate = newRow.toString() + "-" + newColumn.toString()

      if (isValidCell(newRow, newColumn, MAX_ROWS, MAX_COLUMNS) && minesPlacement.includes(newCoordinate)) {
          mineCount++
      }
    }
    return mineCount === 0 ? null : mineCount
  }

  // const initializeBoard = (newBoard) => {
  //   const minedBoard = setMines(newBoard)

  //   for (let row = 0; row < 10; row++) {
  //     for (let column = 0; column < 10; column++) {
  //       const mineCount = countAdjacentMines(minedBoard, row, column)
  //       if ( minedBoard[row][column] !== '@' && mineCount !== 0) {
  //         minedBoard[row][column] = mineCount
  //       }
       
  //     }
  //   }
  //   return minedBoard
  // }

  const [board, setBoard] = useState(Array(MAX_ROWS).fill(Array(MAX_COLUMNS).fill(null))
  )


  
  const [winner, setWinner] = useState(false)

  const resetGame = () => {
    setBoard(Array(10).fill(Array(10).fill(null)))
    setWinner(false)
    //resetGameStorage()
  }

  // const updateTile = (coordinates) => {
  //   return ({

  //   })
  // }

  //const [uncovered, setUncovered] = useState(false)
  // const checkTileContent = (coordinates) => {

  // }

  const checkWin = (tilesClicked) => {
    return tilesClicked === TILES_TO_CLICK
  }


  const uncoverAllTiles = (board) => {
    const revealedBoard = cloneBoard(board)
    for (let row = 0; row < revealedBoard.length; row++) {
      for (let column = 0; column < revealedBoard[0].length; column++) {
        revealedBoard[row][column] = countAdjacentMines(minesPlacement, row, column)
      }
    }
    console.log("revealed board", revealedBoard)
    return revealedBoard
  }

  const updateBoard = (coordinates) => {
    let row = coordinates.split('-')[0]
    let column = coordinates.split('-')[1]

    if (board[row][column] || winner) return
    
    let newBoard = cloneBoard(board)
    if (minesPlacement.includes(coordinates)) {
      setUncoverAll(true)
      newBoard = uncoverAllTiles(newBoard)
      minesPlacement.forEach(minePlacement => {
        let row = Number(minePlacement.split('-')[0])
        let column = Number(minePlacement.split('-')[1])
        newBoard[row][column] = '💣'
      })
    } else {
      newBoard[row][column] = countAdjacentMines(minesPlacement, Number(row), Number(column))
      const newTilesClicked = tilesClicked + 1
      setTilesClicked(newTilesClicked)
    }
    setBoard(newBoard)

    const newWinner = checkWin(tilesClicked)
    setWinner(newWinner)
  }

// (10)['7-3', '2-5', '6-0', '2-2', '3-8', '4-1', '5-6', '9-4', '7-2', '1-9']

// Recursive function: if the mapped row is an array, then it calls itself providing the row, and then copies the row values one at a time (Matrix)  
function cloneBoard(board) {
  return board.map(row => Array.isArray(row) ? cloneBoard(row) : row);
}
  
const [uncoverAll, setUncoverAll] = useState(false)
  
//const [isUncovered, setIsUncovered] =  useState(false) 

  ///
  return (
    <main className='board'>
      <h1>Minesweeper</h1>
      <section>
        <h1 className='minesCount'>Mines: {mines}</h1>
      </section>
      <section className='game'>
        {
          
          board.map((row, rowIndex) => {
            return row.map((value, columnIndex) => {
              return (
                <Tile
                  key={rowIndex.toString() + "-" + columnIndex.toString()}
                  coordinates={rowIndex.toString() + "-" + columnIndex.toString()}
                  updateBoard={updateBoard}
                  uncoverAll={uncoverAll}
                >
                  {value}
                </Tile>
              )
            })
           
          })

        }
      </section>
      <section className='turn'>
      <button className='flag-button'>🚩</button>
      <button onClick={resetGame}>Reset Game</button>
      </section>
      <section>
        <WinnerModal winner={winner} resetGame={resetGame} />
      </section>
    </main>
  )
}

export default App


// To DO:

//Separate the board display and the board logic (Number, symols)