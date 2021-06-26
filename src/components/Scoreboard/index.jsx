import React from 'react';

import { useGameContext } from '../../contexts/GameContext';

import './styles.css';

import PlayerTimes from '../../assets/times.png';
import PlayerCircle from '../../assets/circle.png';

function Scoreboard() {
  const { score } = useGameContext();

  return (
    <div className="scoreboard-container">
      <p>Placar</p>

      <div className="player-scores">
        <div className="score">
          <img src={PlayerTimes} alt="player times" />
          <p className="score-player-times">{score.times} pts</p>
        </div>

        <div className="score">
          <img src={PlayerCircle} alt="player circle" />
          <p className="score-player-circle">{score.circle} pts</p>
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;
