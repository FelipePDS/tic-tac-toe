import React from 'react';

import './styles.css';

import { usePlayerContext } from '../../contexts/PlayersContext';

import PlayerTimes from '../../assets/times.png';
import PlayerCircle from '../../assets/circle.png';

function PlayerTurnBoard() {
  const { playerTurn } = usePlayerContext();

  return (
    <div className="player-turn-board-container">
      <p>Vez do jogador:</p>
      {
        playerTurn === 'times'
          ? (<img src={PlayerTimes} alt="Player Times" />)
          : (<img src={PlayerCircle} alt="Player Circle" />)
      }
    </div>
  );
}

export default PlayerTurnBoard;
