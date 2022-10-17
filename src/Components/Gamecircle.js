import React from 'react'
import '../Game.css'

const GameCircle = ({ children, id, onCircleClicked, className }) => {
    return (
        <div className={`gameCircle ${className}`} onClick={() => onCircleClicked(id)}>{children}</div>
    )
}

export default GameCircle