import { useState } from 'react'

import { WinnerModal } from './components/WinnerModal'
//import { TURNS } from './Constants'
//import { checkWinner, checkEndGame } from './Logic/board'
//import { WinnerModal } from './components/WinnerModal'
//import { saveGameStorage, resetGameStorage } from './Storage/StorageLocal'
import { Tile } from './components/Tile'
// import './App.css'

function App () {
  const mines = 5
  const MAX_MINES = 10

  const setMines = (newBoard) => {
    const minedBoard = cloneBoard(newBoard)
    for (let mine = 0; mine < MAX_MINES; mine++) {
      const row = Math.floor(Math.random() * 10)
      const column = Math.floor(Math.random() * 10)
      
      if (minedBoard[row][column] === null) {
        minedBoard[row][column] = '@'
      }
      
    }
    return minedBoard
  }

  function isValidCell(row, col, numRows, numCols) {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
  }

  const countAdjacentMines = (minedBoard, row, column) => {
    const ROWS = minedBoard.length
    const COLUMNS = minedBoard[0].length;
    let mineCount = 0

    const xAxysDirections = [-1, -1, -1, 0, 0, 1, 1, 1]
    const yAxysDirections = [-1, 0, 1, -1, 1, -1, 0, 1]

    for (let direction = 0; direction < xAxysDirections.length; direction++) {
      const newRow = row + xAxysDirections[direction]
      const newColumn = column + yAxysDirections[direction]
      if (isValidCell(newRow, newColumn, ROWS, COLUMNS) && minedBoard[newRow][newColumn] === '@') {
          mineCount++
      }
    }
    return mineCount
  }

  const initializeBoard = (newBoard) => {
    const minedBoard = setMines(newBoard)

    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        const mineCount = countAdjacentMines(minedBoard, row, column)
        if ( minedBoard[row][column] !== '@' && mineCount !== 0) {
          minedBoard[row][column] = mineCount
        }
       
      }
    }
    return minedBoard
  }

  const [board, setBoard] = useState(initializeBoard(Array(10).fill(Array(10).fill(null)))
  )
  console.log(board)


  
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(10).fill(Array(10).fill(null)))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateTile = (coordinates) => {
    return ({

    })
  }

  const [uncovered, setUncovered] = useState(false)



  const updateBoard = (coordinates) => {
   
    const column = coordinates.split('-')[1]
    const row = coordinates.split('-')[0]
    if (board[row][column] || winner) return
    
    const newBoard = cloneBoard(board)
    newBoard[row][column] = 'X'
    setBoard(newBoard)

    
    // const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    // setTurn(newTurn)

    // const newWinner = checkWinner(newBoard)
    // if (newWinner) {
    //   confetti()
    //   setWinner(newWinner)
    // } else if (checkEndGame(newBoard)) {
    //   setWinner(false)
    // }
  }


  ////

// Recursive function: if mapped row is an Array then call itself provinding the row, and then copies the row values one at a time (Matrix)
  function cloneBoard(board) {
    return board.map(row => Array.isArray(row) ? cloneBoard(row) : row);
  }
  

  
  

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
                  setUncovered={setUncovered}
                  isUncovered={uncovered}
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