import React, { useEffect } from 'react';

import { usePlayerContext } from '../../contexts/PlayersContext';
import { useCellsContext } from '../../contexts/CellsContext';
import { useGameContext } from '../../contexts/GameContext';

import PlayerTimes from '../../assets/times.png';
import PlayerCircle from '../../assets/circle.png';

import './styles.css';

function GameBoard() {
  const { 
    players,
    computerPlayer,
    playerTurn
  } = usePlayerContext();

  const { boardLines } = useCellsContext();

  const {
    calculateRoundConditions, 
    handleHumanPlayerPlay,
    handleComputerPlayerPlay
  } = useGameContext();

  useEffect(() => {
    calculateRoundConditions();

    if (computerPlayer.indexOf(playerTurn) > -1) {
      handleComputerPlayerPlay();
    }
  }, [
    handleHumanPlayerPlay, 
    computerPlayer, 
    playerTurn, 
    calculateRoundConditions,
    handleComputerPlayerPlay,
    boardLines,
    players
  ]);

  return (
    <div className="board-container">
      {
        boardLines.map(([line], lineIndex) => (
          <div key={line.id} className="board-line">

            {
              line.cells.map((cell, cellIndex) => (
                <div 
                  key={cell.id}
                  
                  className={
                    `cell ${line.className} ${cell.className} 
                    ${cell.isMarked && 'isMarked'}`
                  }

                  onClick={() => handleHumanPlayerPlay(lineIndex, cellIndex)}
                >
                  {
                    cell.playerMarkedCell === 'times'
                      ? (<img src={PlayerTimes} alt={`Cell ${cell.id}`} />)
                    : cell.playerMarkedCell === 'circle'
                      && (<img src={PlayerCircle} alt={`Cell ${cell.id}`} />)
                  }
                </div>
              ))
            }
            
          </div>
        ))
      }
    </div>
  );
}

export default GameBoard;
