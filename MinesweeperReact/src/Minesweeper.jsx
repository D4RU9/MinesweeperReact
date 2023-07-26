import { useState, useEffect } from 'react'
import { Tile } from './components/Tile'
import { WinnerText } from './components/WinnerModal'
import { MAX_MINES, X_AXYS_DIRECTIONS, Y_AXYS_DIRECTIONS, TILES_TO_CLICK} from './components/Constants'
import { getTileCoordinate, createBoard, isValidCell, cloneBoard } from './components/BoardLogic'
import { BoardFeatures } from './components/BoardFeatures'
import { setMines, countAdjacentMines, revealAllMines } from './components/MinesLogic'
//import { checkWinner, checkEndGame } from './Logic/board'
//import { saveGameStorage, resetGameStorage } from './Storage/StorageLocal'


//const [symbolicBoard, setSymbolicBoard] = useState(createBoard(MAX_ROWS, MAX_COLUMNS, '.')
// background: rgb(255,212,122);
// background: radial-gradient(circle, rgba(255,212,122,1) 0%, rgba(118,59,162,1) 100%);

function App () {

  const [mineCounter, setMineCounter] = useState(MAX_MINES)

  const [isDisabled, setIsDisabled] = useState(false)

  const [clickedCells, setClickedCells] = useState([])

  const [board, setBoard] = useState(createBoard(null))

  const [minesCoordinates, setminesCoordinates] = useState(setMines())

  const [winner, setWinner] = useState(null)

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer =
      counter > - 1 && setInterval(() => setCounter(counter + 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  const resetGame = () => {
    setBoard(Array(10).fill(Array(10).fill(null)))
    setWinner(null)
    setminesCoordinates(setMines())
    setClickedCells([])
    setIsDisabled(false)
    setCounter(0)
    setMineCounter(MAX_MINES)
    //resetGameStorage()
  }

  const checkWin = (NumberOfTilesClicked) => {
    return NumberOfTilesClicked === TILES_TO_CLICK ? true : null
  }

  const uncoverTilesCascadeEffect = (clickedCells, board, rowIndex, columnIndex) => {
    const coordinate = getTileCoordinate(rowIndex, columnIndex) 
      if (!clickedCells.includes(coordinate) && !minesCoordinates.includes(coordinate)) {
        clickedCells.push(getTileCoordinate(rowIndex, columnIndex))
        const numberOfAdjacentMines = countAdjacentMines(minesCoordinates, rowIndex, columnIndex)
        board[rowIndex][columnIndex] = numberOfAdjacentMines

        if (numberOfAdjacentMines === null) {
          for (let direction = 0; direction < X_AXYS_DIRECTIONS.length; direction++) {
            const newRow = rowIndex + X_AXYS_DIRECTIONS[direction];
            const newColumn = columnIndex + Y_AXYS_DIRECTIONS[direction];

            if (
              isValidCell(newRow, newColumn)
              && board[newRow][newColumn] !== '🚩'
            ) {
            uncoverTilesCascadeEffect(clickedCells, board, newRow, newColumn)
          }
          }
        }
      }
    setBoard(board)
    setClickedCells(clickedCells)
  } 

const setTileTag = (rowIndex, columnIndex, tag) => {
  const newBoard = cloneBoard(board)
  newBoard[rowIndex][columnIndex] = tag
  setBoard(newBoard)
}

const uncoverTile = (clickedCells, coordinate) => {
  if (!clickedCells.includes(coordinate)) {
    clickedCells.push(coordinate)
    setClickedCells(clickedCells)
  }
}

const handleRightClick = (event, rowIndex, columnIndex) => {
  event.preventDefault()
  if (clickedCells.includes(getTileCoordinate(rowIndex, columnIndex))) return
  if (cloneBoard(board)[rowIndex][columnIndex] === '🚩') {
    setTileTag(rowIndex, columnIndex, '🤨')
    setMineCounter(mineCounter + 1)
  } else if (cloneBoard(board)[rowIndex][columnIndex] === '🤨') {
    setTileTag(rowIndex, columnIndex, '')
  } else {
    setTileTag(rowIndex, columnIndex, '🚩')
    setMineCounter(mineCounter - 1)
  }
}

const handleLeftClick = (rowIndex, columnIndex) => {
  const tileCoordinate = getTileCoordinate(rowIndex, columnIndex)
  const newBoard = cloneBoard(board)
  const newClickedCells = [...clickedCells]
  if (minesCoordinates.includes(tileCoordinate)) {
    revealAllMines(newBoard, setBoard, newClickedCells, setClickedCells, minesCoordinates)
    setWinner(false)
    setIsDisabled(true)
  } else {
    if (countAdjacentMines(minesCoordinates, rowIndex, columnIndex) !== null) {
      newBoard[rowIndex][columnIndex] = countAdjacentMines(minesCoordinates, rowIndex, columnIndex)
      setBoard(newBoard)
      uncoverTile(newClickedCells, tileCoordinate)
      
    } else {
      uncoverTilesCascadeEffect(newClickedCells, newBoard, rowIndex, columnIndex)
    }
    const numberOfTilesClicked = newClickedCells.length
    const newWinner = checkWin(numberOfTilesClicked)
    setWinner(newWinner)
    newWinner ? setIsDisabled(true) : setIsDisabled(false) 
  }
}

  return (
    <main className='board'>
      <h1 className='title'>Minesweeper</h1>
      <BoardFeatures winner={winner} mineCounter={mineCounter} timer={counter} resetGame={resetGame}/>
      <section className='game'>
        {  
          board.map((row, rowIndex) => {
            return row.map((value, columnIndex) => {
              const cellCoordinate = getTileCoordinate(rowIndex, columnIndex)
              const isClicked = clickedCells.includes(cellCoordinate)
              return (
                <Tile
                  key={getTileCoordinate(rowIndex, columnIndex)}
                  isClicked={isClicked}
                  onLeftClick={() => handleLeftClick(rowIndex, columnIndex)}
                  onRightClick={(event) => handleRightClick(event, rowIndex, columnIndex)}
                  disabled={isDisabled}
                >
                  {value}
                </Tile>)
            })
          })
        }
      </section>
      <section>
        <WinnerText winner={winner} />
      </section> 
      
    </main>
  )
}

export default App

// To DO:
//Separate the board display and the board logic (Number, symols)