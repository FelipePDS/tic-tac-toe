import React, { createContext, useContext, useState } from 'react';

import { boardLinesProps } from '../utils/cellsUtil';

const CellsContext = createContext();

export function CellsContextProvider({ children }) {
  const [boardLines, setBoardLines] = useState(boardLinesProps);

  function restartBoardLines() {
    boardLinesProps.forEach(([ line ]) => {
      line.cells.forEach(cell => {

        cell.isMarked = false;
        cell.playerMarkedCell = '';

      });
    });

    setBoardLines(boardLinesProps);
  }

  return (
    <CellsContext.Provider value={{
      boardLines,
      setBoardLines,
      restartBoardLines
    }}>
      {children}
    </CellsContext.Provider>
  );
}

export function useCellsContext() {
  return useContext(CellsContext);
}
