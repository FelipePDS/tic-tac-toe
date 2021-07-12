import React, { createContext, useContext } from 'react';

import { useCellsContext } from './CellsContext';
import { useGameContext } from './GameContext';
import { usePlayerContext } from './PlayersContext';

const PlaysContext = createContext();

export function PlaysContextProvider({ children }) {
  const { 
    players,
    humanPlayer,
    computerPlayer,
    playerTurn,
    togglePlayerTurn,
    addPlayerPlay
  } = usePlayerContext();

  const { 
    boardLines,
    setBoardLines
  } = useCellsContext();

  const {
    winningPossibilities,
    endRound
  } = useGameContext();

  function handleNewPlayerPlay(lineIndex, cellIndex) {
    const cellIsMarked = boardLines[lineIndex][0].cells[cellIndex].isMarked;

    if (!cellIsMarked) {
      let newBoardLine = boardLines;
      newBoardLine[lineIndex][0].cells[cellIndex].isMarked = true;
      newBoardLine[lineIndex][0].cells[cellIndex].playerMarkedCell = playerTurn;

      setBoardLines(newBoardLine);
      addPlayerPlay(boardLines[lineIndex][0].cells[cellIndex].id, playerTurn);
      togglePlayerTurn();
    }
  }

  function handleHumanPlayerPlay(lineIndex, cellIndex) {
    if (humanPlayer.indexOf(playerTurn) < 0 || endRound) return;

    handleNewPlayerPlay(lineIndex, cellIndex);
  }

  function handleComputerPlayerPlay() {
    if (computerPlayer.indexOf(playerTurn) < 0 || endRound) return;

    const unmarkedCells = [];

    boardLines.forEach(([line], lineIndex) => {
      line.cells.forEach((cell, cellIndex) => {

        if (!cell.isMarked) {
          unmarkedCells.push({
            lineIndex,
            cellIndex,
            id: cell.id
          });
        }

      });
    });

    const randomUnmarkedCells = Math.floor(
      Math.random() * unmarkedCells.length
    );

    let { 
      lineIndex, 
      cellIndex 
    } = unmarkedCells[randomUnmarkedCells];

    
    function calculateBestPlay(objective) {
      const player = objective === 'win' 
        ? players[computerPlayer[0]] 
        : players[humanPlayer[0]];

      let positionForThePlayerToWin = "";

      winningPossibilities.forEach(winningPossibilitie => {
        let playerPlaysForWinningPossibilitie = 0;

        player.plays.forEach(play => {

          winningPossibilitie.forEach(possibilitie => {
            
            if (possibilitie === play) {
              playerPlaysForWinningPossibilitie++;
            } else {
              positionForThePlayerToWin = possibilitie;
            }

            if (playerPlaysForWinningPossibilitie === 2) {
              unmarkedCells.forEach(unmarkedCell => {
                if (unmarkedCell.id === positionForThePlayerToWin) {
                  boardLines.forEach(([line], lineIndexOfMoment) => {
                    line.cells.forEach((cell, cellIndexOfMoment) => {
                  
                      if (cell.id === positionForThePlayerToWin) {
                        lineIndex = lineIndexOfMoment;
                        cellIndex = cellIndexOfMoment;
                      }

                    });
                  });
                }
              });
            }
          });

        });
      });
    }

    calculateBestPlay('win');
    calculateBestPlay('defend');

    setTimeout(() => {
      handleNewPlayerPlay(lineIndex, cellIndex);
    }, 200);
  }

  return (
    <PlaysContext.Provider value={{
      handleHumanPlayerPlay,
      handleComputerPlayerPlay
    }}>
      {children}
    </PlaysContext.Provider>
  )
}

export function usePlaysContext() {
  return useContext(PlaysContext);
}
