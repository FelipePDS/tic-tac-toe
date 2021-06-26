import React, { createContext, useContext, useState } from 'react';

import { usePlayerContext } from './PlayersContext';
import { useCellsContext } from './CellsContext';

const GameContext = createContext();

export function GameContextProvider({ children }) {
  const { 
    players,
    restartPlayers
  } = usePlayerContext();

  const { restartBoardLines } = useCellsContext()

  const scoreProps = {
    times: 0,
    circle: 0
  }

  const winningPossibilities = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

  const [score, setScore] = useState(scoreProps);
  const [winningPlayerOfRound, setWinningPlayerOfRound] = useState('');
  const [endOfRound, setEndOfRound] = useState(false);

  // Verificar jogadas do jogador

  function startNewRound() {
    restartPlayers();
    restartBoardLines();
  }
  
  return (
    <GameContext.Provider value={{
      score
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
