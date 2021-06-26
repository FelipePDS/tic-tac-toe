import React from 'react';

import { PlayerContextProvider } from '../../contexts/PlayersContext';
import { CellsContextProvider } from '../../contexts/CellsContext';
import { GameContextProvider } from '../../contexts/GameContext';

import PlayerTurnBoard from '../PlayerTurnBoard';
import GameBoard from '../GameBoard';
import Scoreboard from '../Scoreboard';

function Game() {
  return (
    <PlayerContextProvider>
      <CellsContextProvider>
        <GameContextProvider>

          <PlayerTurnBoard />
          <GameBoard />
          <Scoreboard />

        </GameContextProvider>
      </CellsContextProvider>
    </PlayerContextProvider>
  );
}

export default Game;
