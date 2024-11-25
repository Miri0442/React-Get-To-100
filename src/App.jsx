import { useState } from 'react'
import './App.css'
import GameBoard from './components/gameBoard/GameBoard'
import Register from './components/register/Register'
import TopPlayers from './components/topPlayers/TopPlayers'

function App() {
  const [players, setPlayers] = useState([]);
  const [gameState, isGameOn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  const createGames = () => {
    if (players.length > 0) {
      isGameOn(true);
    }
    else {
      setMessage('Error: No players found!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <>
      {message && (
        <div className="notification">
          {message}
        </div>
      )}

      {!isRegistering && !gameState && (
        <div>
          <h1 className="header">Get To<div className="icon">100</div></h1>
          <TopPlayers />
          <div className='homeBtn'>
            <button onClick={() => setIsRegistering(true)}>Add Player</button>
            <button onClick={createGames}>Create Games</button>
          </div>

          <div className="loggedPlayers">
            <h2>Game participants:</h2>
            <ul>
              {players.map((player, index) => (
                <li key={index}>{player.username}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isRegistering && (
        <Register setPlayers={setPlayers} setIsRegistering={setIsRegistering} setMessage={setMessage} message={message} />
      )}

      {gameState && !isRegistering && (
        <GameBoard setPlayers={setPlayers} isGameOn={isGameOn} players={players} />
      )}
    </>
  )
}

export default App