//import { Square } from './Square'

export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Draw' : ' Wins'
  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>
        <header className='win'>
          {
              (function () {
                if (winner) {
                  return <Square>{winner}</Square>
                }
              })()
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
