import { useState } from 'react'

/*
const Game = ({ height, width, mines}) => {

}

const Tile = ({ children, isClicked, updateBoard, coordinates }) => {
  const className = `tile ${isClicked ? 'is-clicked' : ''}` // is-selected

  const handleClick = () => {
    updateBoard(coordinates)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

function App () {
  const getBoardTile = (coordinates) => {
    const axys = coordinates.Number(split(','))
    return axys
  }

  const rows = new Array(10)
  const columns = new Array(10)
  
  const [board, setBoard] = useState(rows.fill(columns.fill(null)))

  const updateBoard = (coordinates) => {
    const row = getBoardTile(coordinates)[0]
    const column = getBoardTile(coordinates)[1]
    //if (board[][getBoardTile[1]] || winner) return
    const newBoard = [...board]
    newBoard[row][column] = 'A'
    setBoard(newBoard)
  }

  return (
    
    <main className='board'>
      <h1>Minesweeper</h1>
      <button onClick={resetGame}>Reset Game</button>
      <section className='game'>
        {
          board.map((tile, coordinates) => {
            return (
              <Tile
                key={coordinates}
                coordinates={coordinates}
                updateBoard={updateBoard}
              >
                {tile}
              </Tile>
            )
          })

        }
      </section>
  
    </main>
  )
}
*/

function MineSweeper () {
  const board = []
  const rows = 8
  const columns = 8

  const MINESCOUNT = 5 
  const minesLocation = [] //['2-2', '1-1']
  
  const tilesClicked = 0
  const flaggedEnabled = false

  const gameOver = false

  return (
    <main className='minesweeper'>
      <center><h1>Minesweeper</h1></center>
      <center><h1>Mines: <span className='minesCount'>{MINESCOUNT}</span></h1></center>
      <section className='board'>
      
        {
          <div className='x2'>2</div>
          
        }
      </section>
      <center><button>Reset Game</button></center>
      <center><button className='flag-button'>🚩</button></center>
    </main>
  )
}
export default MineSweeper
