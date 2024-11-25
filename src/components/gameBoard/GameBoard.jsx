import { useState } from 'react'
import Game from '../game/Game'
import '../gameBoard/GameBoard.css'

function GameBoard({ setPlayers, players, isGameOn }) {
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);

    const goToNextPlayer = () => {
        setActivePlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    const addScoreToUser = (email, newScore) => {
        const currentPlayer = players.find((currentPlayer) => currentPlayer.email === email);
        if (currentPlayer) {
            const scoreObject = {
                serialNumber: currentPlayer.scores.length + 1,
                score: newScore
            };
            currentPlayer.scores.push(scoreObject);
        }
        return currentPlayer.scores;
    };

    const removePlayer = (email, newScore) => {
        let updatedScoresArray = addScoreToUser(email, newScore);
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const localPlayer = users.find((localPlayer) => localPlayer.email === email);
        localPlayer.scores = updatedScoresArray;
        localStorage.setItem("users", JSON.stringify(users));
        const updatedPlayers = players.filter((player) => player.email !== email);
        setPlayers(updatedPlayers);
        activePlayerIndex >= updatedPlayers.length ? setActivePlayerIndex(0) : '';
        updatedPlayers.length == 0 ? isGameOn(false) : '';
    };

    return (
        <div className="gameBoard">
            <h2 className="header">Get To<div className="icon">100</div></h2>
            <div className='gamesDisplay'>
                {players.map((player, index) => (
                    <Game
                        key={player.email}
                        player={player}
                        isActive={index === activePlayerIndex}
                        goToNextPlayer={goToNextPlayer}
                        addScoreToUser={addScoreToUser}
                        removePlayer={removePlayer}
                        players={players} />
                ))}
            </div>
        </div>
    );
}

export default GameBoard