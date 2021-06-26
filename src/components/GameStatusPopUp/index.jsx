import React from 'react';

import { useGameContext } from '../../contexts/GameContext';

import Logo from '../../assets/logo.png';
import PlayerTimes from '../../assets/times.png';
import PlayerCircle from '../../assets/circle.png';

import './styles.css';

function GameStatusPopUp() {
  const {  
    winningPlayerOfRound,
    tiedRound,
    endRound
  } = useGameContext();

  return (
    <>
      {
        endRound
          && (
            <div className="pop-up">
              {
                winningPlayerOfRound !== ''
                  && (
                    <span>
                      Jogador Vencedor
                      {
                        winningPlayerOfRound === 'times'
                          ? (<img src={PlayerTimes} alt="Player Times" />)
                          : (<img src={PlayerCircle} alt="Player Circle" />)
                      } 
                    </span>
                  )
              }

              {
                tiedRound
                  && (
                    <span>
                      Jogo empatado
                      <img src={Logo} alt="Logo" />
                    </span>
                  )
              }
            </div>
          )
      }
    </>
  )
}

export default GameStatusPopUp;
