/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './WinnerModal.scss';

type Props = {
  userScore: number;
  pcScore: number;
  setUserScore: (userScore: number) => void;
  setPcScore: (pcScore: number) => void;
  userChoice: (userChoice: string) => void;
  pcChoice: (pcChoice: string) => void;
  userHealth: (userHealth: number) => void;
  pcHealth: (pcHealth: number) => void;
  result: (result: string) => void;

  userName: string;
};

const WinnerModal: React.FC<Props> = ({
  userChoice,
  pcChoice,
  result,
  userScore,
  pcScore,
  setPcScore,
  setUserScore,
  userName,
  userHealth,
  pcHealth,
}) => {
  const resetGame = () => {
    userChoice('');
    pcChoice('');
    result('');
    setUserScore(0);
    setPcScore(0);
    pcHealth(100);
    userHealth(100);
  };
  return (
    <div className="winner__modal">
      <div>
        {userScore > pcScore ? (
          <div>
            <p className="text">{`Congratulations ${userName}`}</p>
            <div className="image__wrapper">
              <img className="image" src="winner.gif" alt="mem" />
            </div>
            <p className="text">YOU WON!!!</p>
          </div>
        ) : (
          <div>
            <p className="text">GAME OVER</p>
            <div className="image__wrapper">
              <img className="image" src="cry.gif" alt="mem" />
            </div>
            <p className="text text--dontworry">
              don't worry it's just a game...
            </p>
          </div>
        )}
      </div>
      <button className="button" onClick={() => resetGame()}>
        PLAY AGAIN
      </button>
    </div>
  );
};
export default WinnerModal;
