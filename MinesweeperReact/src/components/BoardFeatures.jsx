import { Tile } from './Tile'
export function BoardFeatures ({ winner, mineCounter, timer, resetGame }) {
    const changeCatFace = (winner) => {
      if (winner) {
          return '😸'
        } else if (winner === null) {
          return '😼'
        } else {
          return '😿'
        }
    }
    const catFace = changeCatFace(winner)

    return (
        <section className='board-features'>
        <div className='mine-counter'>
          <h2>{mineCounter}</h2>      
        </div>
        <div className='cat-face'>
          {
              <Tile
                key={'Cat'}
                isClicked={false}
                onLeftClick={resetGame}
              >
                {catFace} 
              </Tile>
            }
        </div>
        <div className='timer'>
          <h2>{timer}</h2>      
        </div>
      </section>
    )
  }

