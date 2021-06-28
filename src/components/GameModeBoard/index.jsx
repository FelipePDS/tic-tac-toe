import React, { useState } from 'react';

import { useGameContext } from '../../contexts/GameContext';

import './styles.css';

function GameModeBoard() {
  const {
    gameMode,
    toggleGameMode
  } = useGameContext();

  const [gameStarted, setGameStarted] = useState(false);

  function startGame() {
    setGameStarted(true);
  }
  
  return (
    <>
      {
        !gameStarted
          && (
            <div className="game-mode-window">
              <div className="game-mode-board-container">
                <div className="game-mode-content">
                  <span>MODO DE JOGO</span>

                  <div className="choose-game-mode">
                    <div className="game-mode">
                      <input 
                        type="radio" 
                        id="game-mode-computer" 
                        name="game-mode" 
                        value='computer'
                        onClick={({target}) => target.checked && toggleGameMode(target.value)}
                      />
                      <label htmlFor="game-mode-computer">Computador</label>
                    </div>

                    <div className="game-mode">
                      <input 
                        type="radio" 
                        id="game-mode-multiplayer" 
                        name="game-mode" 
                        value='multiplayer'
                        onClick={({target}) => target.checked && toggleGameMode(target.value)}
                      />
                      <label htmlFor="game-mode-multiplayer">Multiplayer</label>
                    </div>
                  </div>
                </div>

                <div className="start-game">
                  <button onClick={() => startGame()}>Jogar</button>
                </div>
              </div>
            </div>
          )
      }
    </>
  )
}

export default GameModeBoard;
