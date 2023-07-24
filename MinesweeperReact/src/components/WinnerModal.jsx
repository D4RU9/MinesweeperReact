import { Tile } from './Tile'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === false) return null

  const winnerText = 'You Won'
  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {    
            <Tile>{'😸'}</Tile>     
          }
        </header>

        <footer>
          <button onClick={resetGame}>Restart</button>
        </footer>
      </div>
    </section>
  )
}
// {winner && <Square>{winner}</Square>}
