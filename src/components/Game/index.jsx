import React from 'react';

import { PlayerContextProvider } from '../../contexts/PlayersContext';
import { CellsContextProvider } from '../../contexts/CellsContext';
import { GameContextProvider } from '../../contexts/GameContext';
import { PlaysContextProvider } from '../../contexts/PlaysContext';

import GameModeBoard from '../GameModeBoard';
import PlayerTurnBoard from '../PlayerTurnBoard';
import GameBoard from '../GameBoard';
import Scoreboard from '../Scoreboard';
import GameStatusPopUp from '../GameStatusPopUp';

function Game() {
  return (
    <PlayerContextProvider>
      <CellsContextProvider>
        <GameContextProvider>
          <PlaysContextProvider>

            <GameModeBoard />
            <PlayerTurnBoard />
            <GameBoard />
            <Scoreboard />
            <GameStatusPopUp />

          </PlaysContextProvider>
        </GameContextProvider>
      </CellsContextProvider>
    </PlayerContextProvider>
  );
}

export default Game;
