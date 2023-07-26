
export function WinnerModal ({ winner }) {
  if (winner === null) return null

  const ResultText = winner === true ? 'You Win' : ' You Lose'
  return (
    <section className='winner'>
      <div className='text'>
        <h2>{ResultText}</h2>      
      </div>
    </section>
  )
}

