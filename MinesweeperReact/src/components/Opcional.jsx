  // const uncoverAllTiles = (board) => {
  //   const revealedBoard = cloneBoard(board)
  //   for (let row = 0; row < revealedBoard.length; row++) {
  //     for (let column = 0; column < revealedBoard[0].length; column++) {
  //       revealedBoard[row][column] = countAdjacentMines(minesCoordinates, row, column)
  //     }
  //   }
  //   console.log("revealed board", revealedBoard)
  //   return revealedBoard
  // }

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