/* eslint-disable */
//import { useState } from 'react'
//import userEvent from '@testing-library/user-event'
//import Game from '../../components/Game'
//import * as APP from '../../App.consts'
//import { parseMockDataToString } from '../../helpers/mockDataHelper'
//import { MAX_MINES } from '../../components/Constants'
import React, { Component } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Minesweeper from '../../components/Minesweeper.jsx'

const rightClickTile = (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  fireEvent.contextMenu(cell)
}

const leftClickTile = (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  fireEvent.click(cell)
}

const loadMockData = async (mockData) => {
    // const textBox = screen.getByTestId('mockData-text')
    // const button = screen.getByTestId('mockData-submit')
    // userEvent.clear(textBox)
    // userEvent.type(textBox, mockData)
    // userEvent.click(button)
  
  const textarea = screen.getByTestId("mockData-text");
  const submitButton = screen.getByTestId("mockData-submit");

  fireEvent.change(textarea, { target: { value: mockData } });

  fireEvent.click(submitButton);

  await waitFor(() => expect(textarea.value).toBe(mockData));

}


// const loadMockData = (mockData) => {
//   console.log(mockData)
//   const text = screen.getByTestId('mockData-text')
//   const button = screen.getByTestId('mockData-submit')
//   userEvent.type(text, mockData)
//   //await waitFor(() => expect(text.value).toBe(mockData))
//   userEvent.click(button)

  
//   // const textBox = screen.getByTestId("mockData-text");
//   // const submitButton = screen.getByTestId("mockData-submit");
//   // fireEvent.change(textBox, { target: { value: mockData } });
//   // fireEvent.click(submitButton);
//   // console.log("textBox", textBox.textContent)
//   // await waitFor(() => expect(textBox.value).toBe(mockData));
  
// };

export const MineSweeperSteps = ({
    given: Given,
    and : And,
    when: When,
    then: Then
}) => {

  let game
    Given("the player opens the game", () => {
      game = render(<Minesweeper/>)
    })
    Then("all the cells should be covered", () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
          expect(tile).not.toHaveClass('tile is-uncovered')
      })
    })
    Then("all the cells should be untagged", () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
        expect(tile.textContent).toBe('')
      })
      
    })
    Then("all the cells should be enabled", () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
        expect(tile).not.toHaveClass('tile is-disabled')
      })
    })

    // Given(/^the player loads the following mock data: (.*)$/, (data) => {

    //   const textbox = screen.getByTestId('mockData-text')
    //   const button = screen.getByTestId('mockData-submit')
    //   userEvent.clear(textbox)
    //   userEvent.type(textbox, data)
    //   userEvent.click(button)
    // })


    Then(/^the mine count display should show "([^"]*)"$/, (mineNumber) => {

        const mineCounter = screen.getByTestId('mineCounter')
        expect(mineCounter.textContent).toBe("Mines: " + mineNumber)

    })
    
    Given('the player loads the following mock data:', (mockData) => {
      loadMockData(mockData)
    })

    When(/^the player right clicks the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      rightClickTile(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be flagged$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe('🚩')
    });

    And(/^the player tags the cell \((\d+),(\d+)\) as inconclusive$/, (rowIndex, columnIndex) => {
      tagAsInconclusive(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be tagged as inconclusive$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe('🤨')
    });
  
    And(/^the player flags the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      rightClickTile(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be untagged$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe('')
    });


    When(/^the player left clicks the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      leftClickTile(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
  
      expect(cell).toHaveClass('tile is-uncovered')
    });

    And(/^the player uncovers the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      leftClickTile(rowIndex, columnIndex)
    });

    Then(/^the cell \((\d+),(\d+)\) should show "(.*)"$/, (rowIndex, columnIndex, value) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe(value)
    });

    When(/^the player unflags the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      rightClickTile(rowIndex, columnIndex)
    });

}

const tagAsInconclusive = async (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  rightClickTile(rowIndex, columnIndex)
  await waitFor(() => fireEvent.contextMenu(cell))
  
}


/*
export const openTheGame = () => {
  render(<Game />)
}

export const loadMockData = (mockData) => {
  userEvent.keyboard('{ctrl}m')
  const text = screen.getByTestId('mockDataLoader-textarea')
  const button = screen.getByTestId('mockDataLoader-loadButton')
  userEvent.clear(text)
  userEvent.type(text, mockData)
  userEvent.click(button)
}

export const leftClickOnCell = (row, col) => {
  userEvent.click(screen.getByTestId('cell-row' + row + '-col' + col))
}

export const righClickOnCell = (row, col) => {
  fireEvent.contextMenu(screen.getByTestId('cell-row' + row + '-col' + col))
}

export const tagCell = (row, col, tag) => {
  const cell = screen.getByTestId('cell-row' + row + '-col' + col)
  const cellImage = cell.querySelector('img')
  switch (tag) {
    case 'mined': {
      if (cellImage === null) {
        fireEvent.contextMenu(cell)
      } else if (cellImage.src.includes('question.svg')) {
        fireEvent.contextMenu(cell)
        fireEvent.contextMenu(cell)
      }
      break
    }
    case 'uncertain': {
      if (cellImage === null) {
        fireEvent.contextMenu(cell)
        fireEvent.contextMenu(cell)
      } else if (cellImage.src.includes('flag.svg')) {
        fireEvent.contextMenu(cell)
      }
      break
    }
    case '':
    case 'empty': {
      if (cellImage.src.includes('flag.svg')) {
        fireEvent.contextMenu(cell)
        fireEvent.contextMenu(cell)
      } else if (cellImage.src.includes('question.svg')) {
        fireEvent.contextMenu(cell)
      }
      break
    }
  }
}

export const isGameOver = () => {
  return screen.getByTestId('game-status').textContent === APP.GAME_STATUS_GAME_OVER
}

export const isGameWon = () => {
  return screen.getByTestId('game-status').textContent === APP.GAME_STATUS_GAME_WON
}

export const isUncovered = (row, col) => {
  const cell = screen.getByTestId('cell-row' + row + '-col' + col)
  return cell.nodeName !== 'BUTTON'
}

export const verboseToSymbol = (verbose) => {
  switch (verbose) {
    case 'mined': {
      return '!'
    }
    case 'uncertain': {
      return '?'
    }
    case 'empty': {
      return '0'
    }
    case 'a highlighted mine':
    case 'exploded': {
      return '@'
    }
    case 'a mine':
    case 'mine': {
      return '*'
    }
    case 'a wrongly tagged cell':
    case 'wrongly': {
      return 'x'
    }
    case 'covered': {
      return '.'
    }
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    {
      return verbose
    }
    default: {
      return verbose
    }
  }
}

export const getCellContent = (row, col) => {
  const cell = screen.getByTestId('cell-row' + row + '-col' + col)
  let cellValue
  if (isUncovered(row, col)) {
    cellValue = cell.querySelector('img')
    if (cellValue === null) {
      if (cell.innerHTML === '') {
        return '0'
      } else {
        return cell.innerHTML
      }
    } else {
      if (cellValue.src.includes('mine.svg')) {
        return '*'
      } if (cellValue.src.includes('explosion.svg')) {
        return '@'
      }
    }
  } else {
    cellValue = cell.querySelector('img')
    if (cellValue === null) {
      return '.'
    } else {
      if (cellValue.src.includes('flag.svg')) {
        return '!'
      } if (cellValue.src.includes('question.svg')) {
        return '?'
      } if (cellValue.src.includes('wrongly.svg')) {
        return 'x'
      }
    }
  }
}

export const areAllCellsCovered = () => {
  const mineField = screen.getByTestId('mine-field')
  const cells = mineField.querySelectorAll('.mine-field-cell-button')
  return cells.length === APP.NUMBER_OF_ROWS * APP.NUMBER_OF_COLUMNS
}

export const areAllCellsEnabledIs = (status) => {
  let result = true
  const mineField = screen.getByTestId('mine-field')
  const cells = mineField.querySelectorAll('.mine-field-cell-button')
  cells.forEach((cell) => {
    if (cell.disabled === status) {
      result = false
    }
  })
  return result
}

export const isMineFieldLookLike = (expectedMineFieldStatus) => {
  const strData = parseMockDataToString(expectedMineFieldStatus)
  const mineField = strData.split('-').map((row) => { return row.split('') })
  for (let row = 0; row < mineField.length; row++) {
    for (let col = 0; col < mineField[0].length; col++) {
      if (!getCellContent(row, col) === mineField[row][col]) {
        return false
      }
    }
  }
  return true
}

export const getLeftMinesCounter = () => {
  return screen.getByTestId('left-mines-counter').textContent
}
*/
// const doLogin = (user, password) => {
//   fireEvent.change(screen.getByLabelText('User'), { target: { value: user } })
//   fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } })
//   fireEvent.click(screen.getByText('Login'))
// }

// export const MineSweeperSteps = {

// TheUserShouldWinTheGame () {
//   expect(screen.getByText('You win!')).toBeInTheDocument()
// },
// AllTheCellsInTheBoardShouldBeCovered () {
//   // LoginScreenSteps.IEnterUsernameAndPassword(user, password)
// }
// IAmOnTheLoginPage () {
//   render(<Game />)
// },
// IEnterAValidUsernameAndPassword () {
//   doLogin('GoodUser', 'GoodPassword')
// },
// IShouldBeLoggedIn () {
//   const welcomeElement = screen.getByText('Welcome to the app')
//   expect(welcomeElement).toBeInTheDocument()
// },
// IEnterUsernameAndPassword (user, password) {
//   doLogin(user, password)
// },
// IShouldNotBeLoggedIn () {
//   const welcomeElement = screen.getByText('Invalid credentials')
//   expect(welcomeElement).toBeInTheDocument()
// }
// }