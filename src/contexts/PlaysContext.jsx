import React, { createContext, useContext } from 'react';

import { useCellsContext } from './CellsContext';
import { useGameContext } from './GameContext';
import { usePlayerContext } from './PlayersContext';

const PlaysContext = createContext();

export function PlaysContextProvider({ children }) {
  const { 
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
    endRound
  } = useGameContext();

  function newPlayerPlay(lineIndex, cellIndex) {
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

    newPlayerPlay(lineIndex, cellIndex);
  }

  function handleComputerPlayerPlay() {
    if (computerPlayer.indexOf(playerTurn) < 0 || endRound) return;

    let lineIndex = 0;
    let cellIndex = 0;

    do {
      lineIndex = Math.floor(Math.random() * 3);
      cellIndex = Math.floor(Math.random() * 3);
    } while (
      boardLines[lineIndex][0].cells[cellIndex].isMarked
    );

    setTimeout(() => {
      newPlayerPlay(lineIndex, cellIndex);
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
