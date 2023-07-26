import { useState, useEffect } from 'react'
import { Tile } from './components/Tile'
import { WinnerModal } from './components/WinnerModal'
import { MAX_ROWS, MAX_COLUMNS, MAX_MINES, X_AXYS_DIRECTIONS, Y_AXYS_DIRECTIONS, TILES_TO_CLICK} from './components/Constants'
import { setMines, getTileCoordinate, countAdjacentMines } from './components/BoardLogic'
import { BoardFeatures } from './components/BoardFeatures'
//import { checkWinner, checkEndGame } from './Logic/board'
//import { saveGameStorage, resetGameStorage } from './Storage/StorageLocal'



// background: rgb(255,212,122);
// background: radial-gradient(circle, rgba(255,212,122,1) 0%, rgba(118,59,162,1) 100%);

function App () {

  const [mineCounter, setMineCounter] = useState(MAX_MINES)

  const [isDisabled, setIsDisabled] = useState(false)

  const [clickedCells, setClickedCells] = useState([])

  const createBoard = (value) => {
    return Array.from({ length: MAX_ROWS }, () => Array(MAX_COLUMNS).fill(value))
  };

  const [board, setBoard] = useState(createBoard(null))

  const [minesCoordinates, setminesCoordinates] = useState(setMines())

  const [winner, setWinner] = useState(null)

    //const [symbolicBoard, setSymbolicBoard] = useState(createBoard(MAX_ROWS, MAX_COLUMNS, '.'))
  
    const [counter, setCounter] = useState(0)

    // Third Attempts
    useEffect(() => {
      const timer =
        counter > - 1 && setInterval(() => setCounter(counter + 1), 1000)
      return () => clearInterval(timer)
    }, [counter])
  

  //setInterval(setTimer(timer+1),1000)

  const resetGame = () => {
    setBoard(Array(10).fill(Array(10).fill(null)))
    setWinner(null)
    setminesCoordinates(setMines())
    setClickedCells([])
    setIsDisabled(false)
    setCounter(0)
    //resetGameStorage()
  }

  const checkWin = (NumberOfTilesClicked) => {
    return NumberOfTilesClicked === TILES_TO_CLICK ? true : null
  }

  const revealAllMines = (newBoard ,setBoard) => {
    const newClickedCells = [...clickedCells].concat(minesCoordinates)
    minesCoordinates.forEach(minePlacement => {
      let row = Number(minePlacement.split('-')[0])
      let column = Number(minePlacement.split('-')[1])
      newBoard[row][column] = '💣'
      
    })
    setBoard(newBoard)
    setClickedCells(newClickedCells)
  }

  const uncoverTilesCascadeEffect = (clickedCells, board, rowIndex, columnIndex) => {
    const coordinate = getTileCoordinate(rowIndex, columnIndex) 
      if (rowIndex >= 0 
        && rowIndex < MAX_ROWS 
        && columnIndex >= 0 
        && columnIndex < MAX_COLUMNS 
        && !clickedCells.includes(coordinate) 
        && !minesCoordinates.includes(coordinate)) {

        clickedCells.push(getTileCoordinate(rowIndex, columnIndex))
        const numberOfAdjacentMines = countAdjacentMines(minesCoordinates, rowIndex, columnIndex)
        board[rowIndex][columnIndex] = numberOfAdjacentMines

        if (numberOfAdjacentMines === null ) {
          for (let direction = 0; direction < X_AXYS_DIRECTIONS.length; direction++) {
            uncoverTilesCascadeEffect(clickedCells, board, rowIndex + X_AXYS_DIRECTIONS[direction], columnIndex + Y_AXYS_DIRECTIONS[direction])
            
          }
        }
      }
    setBoard(board)
    setClickedCells(clickedCells)
  }

  // const updateBoard = (rowIndex, columnIndex) => {
  //   let coordinate = getTileCoordinate(rowIndex, columnIndex)

    // const newSymbolicBoard = cloneBoard(symbolicBoard)
    // newSymbolicBoard[rowIndex][columnIndex] = 'X'
    // setSymbolicBoard(newSymbolicBoard)
    //board[rowIndex][columnIndex] >= 1 && board[rowIndex][columnIndex] <= 8
    //if (clickedCells.includes(coordinate) || winner) return
    
    //let newBoard = cloneBoard(board)
    // if (minesCoordinates.includes(coordinate)) {
    //   revealAllMines(newBoard, setBoard)
    //   setWinner(false)
    //   setIsDisabled(true)
    // } else {
      // if (countAdjacentMines(minesCoordinates, rowIndex, columnIndex) === null) {
      //   cascadeEmptyTiles(newBoard, rowIndex, columnIndex)
      // } else {
      //   newBoard[rowIndex][columnIndex] = countAdjacentMines(minesCoordinates, rowIndex, columnIndex)
      //   setBoard(newBoard)
      // }
    
      // const newNumberOfTilesClicked = NumberOfTilesClicked + 1
      // setNumberOfTilesClicked(newNumberOfTilesClicked)

      // const newWinner = checkWin(newNumberOfTilesClicked)
      // setWinner(newWinner)
    //}    
  


// Recursive function: if the mapped row is an array, then it calls itself providing the row, and then copies the row values one at a time (Matrix)  
function cloneBoard(board) {
  return board.map(row => Array.isArray(row) ? cloneBoard(row) : row)
}

const setTileTag = (rowIndex, columnIndex, tag) => {
  const newBoard = cloneBoard(board)
  newBoard[rowIndex][columnIndex] = tag
  setBoard(newBoard)
}

const handleRightClick = (event, rowIndex, columnIndex) => {
  event.preventDefault()
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

const uncoverTile = (coordinate) => {
  if (!clickedCells.includes(coordinate)) {
    const prevClickedCells = [...clickedCells, coordinate]
    setClickedCells(prevClickedCells)
  }
}

const handleLeftClick = (rowIndex, columnIndex) => {
  const tileCoordinate = getTileCoordinate(rowIndex, columnIndex)
  const newBoard = cloneBoard(board)
  const newClickedCells = [...clickedCells]
  if (minesCoordinates.includes(tileCoordinate)) {
    revealAllMines(newBoard, setBoard)
    setWinner(false)
    setIsDisabled(true)
  } else {
    if (countAdjacentMines(minesCoordinates, rowIndex, columnIndex) !== null) {
      newBoard[rowIndex][columnIndex] = countAdjacentMines(minesCoordinates, rowIndex, columnIndex)
      setBoard(newBoard)
      uncoverTile(tileCoordinate)
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
                </Tile>
              )
            })
          })
        }
      </section>
      <section>
        <WinnerModal winner={winner} />
      </section> 
      
    </main>
  )
}

export default App

// To DO:
//Separate the board display and the board logic (Number, symols)