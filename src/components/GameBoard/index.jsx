import React from 'react';

import { useCellsContext } from '../../contexts/CellsContext';

import PlayerTimes from '../../assets/times.png';
import PlayerCircle from '../../assets/circle.png';

import './styles.css';

function GameBoard() {
  const { 
    boardLines,
    toggleCell
  } = useCellsContext();

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

                  onClick={() => toggleCell(lineIndex, cellIndex)}
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
