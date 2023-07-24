import { useState } from 'react'

export const Tile = ({ children, coordinates, updateBoard, uncoverAll}) => {
  const [isTileUncovered, setIsTileUncovered] =  useState(false) 
  let className = ''
  if (!uncoverAll) {
    className = `tile ${isTileUncovered ? 'is-uncovered' : ''} `
  } else {
    className = `tile is-uncovered`
  }
    

 
    const handleClick = () => {
      updateBoard(coordinates)
      setIsTileUncovered(true)
      //checkMine(minesPlacement, coordinates)
    }
    
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }
  //() => setIsUncovered(true)