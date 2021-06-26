import React, { createContext, useContext, useState } from 'react';

const PlayerContext = createContext();

export function PlayerContextProvider({ children }) {
  const playersProps = {
    times: {
      plays: []
    },

    circle: {
      plays: []
    }
  };

  const [players, setPlayers] = useState(playersProps);
  const [playerTurn, setPlayerTurn] = useState('times');

  function togglePlayerTurn() {
    setPlayerTurn(
      playerTurn === 'times' ? 'circle' : 'times'
    );
  }

  function addPlayerPlay(cellId, player) {
    let newPlayerPlays = players;
    newPlayerPlays[player].plays.push(cellId);
    
    setPlayers(newPlayerPlays);
  }

  function restartPlayers() {
    setPlayers(playersProps);
  }

  return (
    <PlayerContext.Provider value={{
      players,
      playerTurn,
      togglePlayerTurn,
      addPlayerPlay,
      restartPlayers
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
