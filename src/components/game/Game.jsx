import React, { useState } from 'react'
import '../game/Game.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faDivide, faTimes } from '@fortawesome/free-solid-svg-icons'

function Game({ player, isActive, goToNextPlayer, removePlayer, addScoreToUser, players }) {
    const [sum, setSum] = useState(Math.floor(Math.random() * 99) + 1);
    const [moves, setMoves] = useState(0);
    const [win, changeState] = useState(false);
    const initialScores = players.find((currentPlayer) => currentPlayer.email === player.email);
    const [playerScores, setScores] = useState(initialScores.scores);

    const addOne = () => handleUpdate(sum + 1);
    const reduceOne = () => handleUpdate(sum - 1);
    const divideBy2 = () => handleUpdate(Math.floor(sum / 2));
    const multipleBy2 = () => handleUpdate(sum * 2);

    const handleUpdate = (increasedSum) => {
        setSum(increasedSum);
        setMoves(moves + 1);
        checkWin(increasedSum);
        goToNextPlayer();
    };

    const checkWin = (increasedSum) => {
        increasedSum == 100 ? changeState((prevState) => !prevState) : '';
    };

    const handleLogout = () => {
        removePlayer(player.email, moves);
    };

    const startNewGame = () => {
        const updateScores = addScoreToUser(player.email, moves);
        setScores(updateScores);
        setSum(Math.floor(Math.random() * 99) + 1);
        setMoves(0);
        changeState((prevState) => !prevState);
    }

    return (
        <div className={`game ${isActive ? 'active' : 'inactive'}`}>
            <h2>{player.username}</h2>
            <p>Sum: {sum}</p>
            <p>Moves: {moves}</p>
            <div className="gameBtn">
                <button onClick={addOne} disabled={!isActive}>
                    <FontAwesomeIcon icon={faPlus} />1
                </button>
                <button onClick={divideBy2} disabled={!isActive}>
                    <FontAwesomeIcon icon={faDivide} />2
                </button>
                <button onClick={reduceOne} disabled={!isActive}>
                    <FontAwesomeIcon icon={faMinus} />1
                </button>
                <button onClick={multipleBy2} disabled={!isActive}>
                    <FontAwesomeIcon icon={faTimes} />2
                </button>
            </div>

            <div className='playerScores'>
                <span>Your Scores: </span>
                {playerScores.map((scores, index) => (
                    <span key={index} className='score'>
                        {`${scores.score}`}{" "}
                    </span>
                ))}

            </div>

            <div className={`winBtn ${win ? 'showOptions' : 'playing'}`}>
                <h2>Great Job!!</h2>
                <button onClick={handleLogout}>Log Out</button>
                <button onClick={startNewGame} >Start A New Game</button>
            </div>
        </div>
    );
}

export default Game