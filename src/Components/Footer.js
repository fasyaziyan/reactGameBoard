import React from 'react'
import { GAME_STATE_PLAYING } from '../Constanst'

const Footer = ({ onNewGameCLick, onSuggestCLick, gameState }) => {
    const renderButtons = () => {
        if (gameState === GAME_STATE_PLAYING) {
            return <button onClick={onSuggestCLick}>Suggest</button>
        }
        return <button onClick={onNewGameCLick}>New Game</button>
    }
    return (
        <div className='panel footer'>
            {renderButtons()}
        </div>
    )
}

export default Footer