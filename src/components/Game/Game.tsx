/* eslint-disable prefer-destructuring */
import { useEffect, useState, useRef } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import choices from '../../data/choices';
import IntroModal from '../IntroModal/IntroModal';
import WinnerModal from '../WinnerModal/WinnerModal';
import './Game.scss';
import RulesModal from '../RulesModal/RulesModal';
import LevelModal from '../LevelModal/LevelModal';
import StatsModal from '../StatsModal/StatsModal';

export type Statistics = {
  name: string;
  level: string;
  date: string;
};

const Game = () => {
  const [userChoice, setUserChoice] = useState('');
  const [pcChoice, setPcChoice] = useState('');
  const [userHealth, setUserHealth] = useState(100);
  const [pcHealth, setPcHealth] = useState(100);
  const [result, setResult] = useState('');
  const [userScore, setUserScore] = useState(0);
  const [pcScore, setPcScore] = useState(0);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(true);
  const [introModal, setIntroModal] = useState(true);
  const [names, setNames] = useState<string[]>([]);
  const [settings, setSettings] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);
  const [levelModal, setLevelModal] = useState(false);
  const [statsModal, setStatsModal] = useState(false);
  const [level, setLevel] = useState('Medium');
  const [hideGame, setHideGame] = useState(false);
  const [dateStamp, setDateStamp] = useState('');

  const [statistics, setStatistics] = useState<Statistics[]>(() => {
    const saved = localStorage.getItem('statistics') || '';
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('statistics', JSON.stringify(statistics));
  }, [statistics]);

  useEffect(() => {
    const today = new Date();
    const date = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;

    const time = `${today.getHours()}:`
      + `${
        today.getMinutes() >= 10 ? today.getMinutes() : `0${today.getMinutes()}`
      }`
      + ':'
      + `${
        today.getSeconds() >= 10 ? today.getSeconds() : `0${today.getSeconds()}`
      }`;

    const dateTime = `${date} - ${time}`;
    setDateStamp(dateTime);

    let name;
    if (
      userHealth <= 0
      || pcHealth <= 0
      || userScore === 10
      || pcScore === 10
    ) {
      if (userScore > pcScore) {
        name = names[0];
      } else {
        name = names[1];
      }
      setStatistics([...statistics, { name, level, date: dateStamp }]);
    }
  }, [userHealth, pcHealth]);

  const generatePcChoice = () => {
    const choice = choices.map(({ name }) => name)[
      Math.floor(Math.random() * choices.length)
    ];
    const randomChoice = choice;
    setPcChoice(randomChoice);
  };

  const resetGame = () => {
    window.location.reload();
  };

  const closeSettings = () => {
    setHideGame(true);
    setSettings(!settings);
  };

  const checkResults = () => {
    const userDemage = Math.floor(Math.random() * 10) + 6;
    let pcDamage = 0;
    if (level === 'Easy') {
      pcDamage = Math.floor(Math.random() * 5) + 4;
    } else if (level === 'Medium') {
      pcDamage = Math.floor(Math.random() * 10) + 5;
    } else {
      pcDamage = Math.floor(Math.random() * 22) + 10;
    }

    switch (userChoice + pcChoice) {
      case 'ScissorsPaper':
      case 'RockScissors':
      case 'PaperRock':
      case 'LizardPaper':
      case 'SpockScissors':
      case 'RockLizard':
      case 'PaperSpock':
      case 'SpockRock':
      case 'ScissorsLizard':
      case 'LizardSpock':
        setResult('YOU WIN!');
        setUserScore(userScore + 1);
        setPcHealth(pcHealth - userDemage);
        break;
      case 'PaperScissors':
      case 'ScissorsRock':
      case 'RockPaper':
      case 'PaperLizard':
      case 'ScissorsSpock':
      case 'LizardRock':
      case 'SpockPaper':
      case 'RockSpock':
      case 'LizardScissors':
      case 'SpockLizard':
        setResult('YOU LOSE!');
        setPcScore(pcScore + 1);
        setUserHealth(userHealth - pcDamage);
        break;
      case 'RockRock':
      case 'PaperPaper':
      case 'ScissorsScissors':
      case 'LizardLizard':
      case 'SpockSpock':
        setResult('DRAW!');
        break;
      default:
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setVisible(true);
      checkResults();
      setIsButtonActive(true);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
      setVisible(false);
      setIsButtonActive(false);
    };
  }, [userChoice, pcChoice]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoading(true);
    }, 3000);
    return () => {
      clearTimeout(timeOut);
      setLoading(false);
    };
  }, [introModal]);

  const handleClick = (value: string) => {
    setUserChoice(value);
    generatePcChoice();
  };

  return (
    <div className="game">
      {introModal ? (
        <IntroModal closeModal={setIntroModal} namesArray={setNames} />
      ) : (
        <div>
          <div
            className="loading"
            style={{ display: loading ? 'none' : 'block' }}
          >
            <img className="loading__image" src="loading.gif" alt="" />
            <h1 className="loading__title">Loading...</h1>
          </div>

          {userHealth <= 0
          || userScore === 10
          || pcHealth <= 0
          || pcScore === 10 ? (
            <div>
              <WinnerModal
                pcScore={pcScore}
                userScore={userScore}
                setPcScore={setPcScore}
                setUserScore={setUserScore}
                result={setResult}
                userChoice={setUserChoice}
                pcChoice={setPcChoice}
                userName={names[0]}
                userHealth={setUserHealth}
                pcHealth={setPcHealth}
              />
            </div>
            ) : (
              <div
                className={hideGame ? 'game__content hidden' : 'game__content'}
                style={{ display: loading ? 'block' : 'none' }}
              >
                <div className="logo">
                  <h1 className="game__heading">
                    rock paper scissor lizard spock
                  </h1>
                </div>
                <div className="button__wrapper">
                  <button
                    onClick={() => setSettings(!settings)}
                    className="settings"
                  >
                    <img src="settings.svg" alt="settings button" />
                  </button>
                  <div
                    className={settings ? 'nav__buttons' : 'nav__buttons hidden'}
                    onMouseLeave={() => setSettings(false)}
                  >
                    <button
                      className="buttons buttons--rules"
                      onClick={() => {
                        setRulesModal(true);
                        closeSettings();
                      }}
                    >
                      Rules
                    </button>
                    <button
                      className="buttons buttons--level"
                      onClick={() => {
                        setLevelModal(true);
                        closeSettings();
                      }}
                    >
                      Level
                    </button>
                    <button
                      className="buttons buttons--rules"
                      onClick={() => {
                        setStatsModal(true);
                        closeSettings();
                      }}
                    >
                      Stats
                    </button>
                    <button
                      className="buttons buttons--reset"
                      onClick={() => resetGame()}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                <h1 className="result">{visible ? result : ''}</h1>

                <div className="battle">
                  <div className="game__user">
                    <h1 className="game__user--title">User</h1>
                    <p className="game__user--name">{`Name: ${names[0]}`}</p>
                    <p className="game__user--choice">{`Chose: ${userChoice}`}</p>
                    <p className="game__user--score">{`Score: ${userScore}`}</p>
                    <p className="game__user--level">{`Level: ${level}`}</p>
                    <p className="game__user--health">Health:</p>
                    <ProgressBar
                      completed={userHealth}
                      bgColor="#7cdb8c"
                      labelAlignment="center"
                      baseBgColor="#fefefb"
                      maxCompleted={100}
                    />
                  </div>
                  <div className="battle__block">
                    <div className="battle__character">
                      {choices
                        .filter(({ name }) => name === userChoice)
                        .map(({ imgSrc, id }) => (
                          <img
                            className="battle__character--image"
                            src={imgSrc}
                            key={id}
                            alt={imgSrc}
                          />
                        ))}
                    </div>
                    <span className="battle__vs">VS</span>
                    <div className="battle__character">
                      {choices
                        .filter(({ name }) => name === pcChoice)
                        .map(({ imgSrc }) => (
                          <img
                            className="battle__character--image"
                            key={imgSrc}
                            src={visible ? imgSrc : '1.gif'}
                            alt={imgSrc}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="game__pc">
                    <h1 className="game__pc--title">PC</h1>
                    <p className="game__pc--name">{`Name: ${names[1]}`}</p>
                    <p className="game__pc--choice">
                      {`Chose: ${visible ? pcChoice : '?'}`}
                    </p>
                    <p className="game__pc--score">{`Score: ${pcScore}`}</p>
                    <p className="game__pc--level">{`Level: ${level}`}</p>
                    <p className="game__pc--health">Health:</p>
                    <ProgressBar
                      completed={pcHealth}
                      bgColor="#7cdb8c"
                      labelAlignment="center"
                      baseBgColor="#fefefb"
                      maxCompleted={100}
                    />
                  </div>
                </div>
                <div className="buttons__wrapper">
                  {choices.map(({ name, imgSrc }) => (
                    <div className="character__block">
                      <p className="character__name">{name}</p>
                      <button
                        className="button__character"
                        disabled={!isButtonActive}
                        onClick={() => handleClick(name)}
                        key={name}
                      >
                        <img className="character__image" src={imgSrc} alt="" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
      {rulesModal && (
        <RulesModal closeModal={setRulesModal} hideGame={setHideGame} />
      )}
      {levelModal && (
        <LevelModal
          closeModal={setLevelModal}
          hideGame={setHideGame}
          level={setLevel}
        />
      )}
      {statsModal && (
        <StatsModal
          stats={statistics}
          closeModal={setStatsModal}
          hideGame={setHideGame}
        />
      )}
    </div>
  );
};
export default Game;
