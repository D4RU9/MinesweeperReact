import { useState } from 'react'

export const Tile = ({ children, updateBoard, coordinates, setUncovered }) => {
  const [isUncovered, setIsUncovered] =  useState(false) 
  let className = `square ${isUncovered ? 'is-uncovered' : ''} `
  // x${children}
    const handleClick = () => {
      updateBoard(coordinates)
      //setUncovered(true)
    }
    

    return (
      <div onClick={() => setIsUncovered(!isUncovered)} className={className}>
        {children}
      </div>
    )
  }
  