export const Tile = ({ children, isClicked, onLeftClick, onRightClick, disabled}) => {
  const className = `tile ${isClicked ? 'is-uncovered' : ''} ${disabled ? 'is-disabled' : ''} ` 
    
    return (
      <div onClick={onLeftClick} onContextMenu={onRightClick} className={className}>
        {children}
      </div>
    )
  }
