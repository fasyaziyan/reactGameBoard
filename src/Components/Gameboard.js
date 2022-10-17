import React, { useEffect, useState } from 'react'
import GameCircle from './Gamecircle'
import '../Game.css'
import Header from './Header'
import Footer from './Footer'
import { isDraw, isWinner, getComputerMove } from '../Helper'
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN, NO_CIRCLE, NO_PLAYER, PLAYER_1, PLAYER_2 } from '../Constanst'

const GameBoard = () => {
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLE).fill(NO_PLAYER))
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1)
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING)
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER)

    useEffect(() => {
        initGame()
    }, [])

    const initGame = () => {
        console.log('init game')
        setGameBoard(Array(NO_CIRCLE).fill(NO_PLAYER))
        setCurrentPlayer(PLAYER_1)
        setGameState(GAME_STATE_PLAYING)
    }

    const initBoard = () => {
        const circles = []
        for (let i = 0; i < NO_CIRCLE; i++) {
            circles.push(renderCircle(i))
        }
        return circles
    }

    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard))
    }

    const circleClicked = (id) => {
        console.log('CLick Cicrcle' + id)

        //Validasi Click Gameboard
        if (gameBoard[id] !== NO_PLAYER) return
        //Validasi Game Winn
        if (gameState !== GAME_STATE_PLAYING) return

        //Cek Winner from isWinner
        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN)
            setWinPlayer(currentPlayer)
        }
        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW)
            setWinPlayer(NO_PLAYER)
        }

        //Memperbarui Array
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer
                return circle
            })
        })

        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)
        console.log(gameBoard)
        console.log(currentPlayer)
    }
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />
    }
    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className='gameBoard'>
                {initBoard()}
            </div>
            <Footer onNewGameCLick={initGame} onSuggestCLick={suggestMove} gameState={gameState} />
        </>
    )
}

export default GameBoard