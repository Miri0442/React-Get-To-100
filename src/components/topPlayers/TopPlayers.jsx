import React from 'react'
import '../topPlayers/TopPlayers.css'

function TopPlayers() {
    const AllPlayers = JSON.parse(localStorage.getItem("users")) || [];
    const playersWithLowestScorePerGame = AllPlayers.map((player) => {
        const totalScore = player.scores.reduce((sum, game) => sum + game.scores, 0);
        const scorePerGame = totalScore / player.scores.length;
        return { ...player, scorePerGame };
    });

    const topThreePlayers = playersWithLowestScorePerGame
        .sort((a, b) => a.scorePerGame - b.scorePerGame)
        .slice(0, 3);

    return (
        <div className='topPlayersDiv'>
            <h3>Top 3 Players</h3>
            <ul >
                {topThreePlayers.map((player, index) => (
                    <li key={index}>
                        {player.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopPlayers