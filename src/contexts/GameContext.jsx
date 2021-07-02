import React, { createContext, useContext, useState } from 'react';

import { usePlayerContext } from './PlayersContext';
import { useCellsContext } from './CellsContext';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const { 
    players,
    humanPlayer,
    computerPlayer,
    toggleHumanPlayer,
    toggleComputerPlayer,
    playerTurn,
    togglePlayerTurn,
    addPlayerPlay,
    restartPlayers
  } = usePlayerContext();

  const { 
    boardLines,
    setBoardLines,
    restartBoardLines
  } = useCellsContext();

  const winningPossibilities = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
  ];

  const scoreProps = {
    times: 0,
    circle: 0
  };

  const [score, setScore] = useState(scoreProps);
  const [gameMode, setGameMode] = useState('computer' || 'multiplayer');
  const [winningPlayerOfRound, setWinningPlayerOfRound] = useState('');
  const [tiedRound, setTiedRound] = useState(false);
  const [endRound, setEndRound] = useState(false);

  function toggleGameMode(newGameMode) {
    setGameMode(newGameMode);

    if (newGameMode === 'computer') {
      toggleHumanPlayer(['times']);
      toggleComputerPlayer(['circle']);
    }

    if (newGameMode === 'multiplayer') {
      toggleHumanPlayer(['times', 'circle']);
      toggleComputerPlayer(['']);
    }
  }

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
    if (humanPlayer.indexOf(playerTurn) < 0) return;

    newPlayerPlay(lineIndex, cellIndex);
  }

  function handleComputerPlayerPlay() {
    if (computerPlayer.indexOf(playerTurn) < 0) return;

    let lineIndex = 0;
    let cellIndex = 0;

    while (boardLines[lineIndex][0].cells[cellIndex].isMarked) {
      lineIndex = Math.floor(Math.random(3) * 3);
      cellIndex = Math.floor(Math.random(3) * 3);
    }

    newPlayerPlay(lineIndex, cellIndex);
  }

  function startNewRound() {
    restartPlayers();
    restartBoardLines();

    setTimeout(() => {
      setEndRound(false);
    }, 1970);
  }

  function declareWinner(player) {
    let newScore  = score;
    newScore[player]++;

    setWinningPlayerOfRound(player);
    setScore(newScore);
    setTiedRound(false);
    setEndRound(true);
    startNewRound();
  }

  function declareTie() {
    setWinningPlayerOfRound('');
    setTiedRound(true);
    setEndRound(true);
    startNewRound();
  }
  
  function calculateRoundConditions() {
    const player = playerTurn === 'times' ? 'circle' : 'times';

    const winner = winningPossibilities.map(winningPossibilitie => (

      players[player].plays.map(play => (
        winningPossibilitie.filter(possibilitie => 
          possibilitie === play
        ).length === 1 ? play : null
      ))
      .filter(play => play !== null)
      .length === 3

    )).find(playsComparedToWinning => playsComparedToWinning === true);

    if (winner) {
      declareWinner(player);
      return { endRound: true }
    }

    let markedCellCounter = 0;

    boardLines.forEach(([ line ]) => {
      line.cells.forEach(cell => {
        cell.isMarked && markedCellCounter++;
      });
    });

    const tie = markedCellCounter === 9;

    if (tie) {
      declareTie();
      return { endRound: true }
    }

    return { endRound: false }
  }
  
  return (
    <GameContext.Provider value={{
      score,
      gameMode,
      toggleGameMode,
      handleHumanPlayerPlay,
      handleComputerPlayerPlay,
      calculateRoundConditions,
      winningPlayerOfRound,
      tiedRound,
      endRound
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
