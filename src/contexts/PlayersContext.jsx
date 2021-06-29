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
  const [humanPlayer, setHumanPlayer] = useState(['times']);
  const [computerPlayer, setComputerPlayer] = useState(['circle']);
  const [playerTurn, setPlayerTurn] = useState('times');

  function toggleHumanPlayer(player) {
    setHumanPlayer(player);
  }

  function toggleComputerPlayer(player) {
    setComputerPlayer(player);
  }

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
      humanPlayer,
      computerPlayer,
      toggleHumanPlayer,
      toggleComputerPlayer,
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
