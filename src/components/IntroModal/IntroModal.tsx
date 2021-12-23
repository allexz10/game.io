/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import './IntroModal.scss';

type Props = {
  closeModal: (arg: boolean) => void;
  namesArray: (name: string[]) => void;
};

const IntroModal: React.FC<Props> = ({ closeModal, namesArray }) => {
  const [userName, setUserName] = useState('');
  const [pcName, setPcName] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  const isValid = userName && pcName && checkbox;

  const handleClick = () => {
    if (isValid) {
      namesArray([userName, pcName]);
      closeModal(false);
    } else {
      closeModal(true);
    }
  };

  return (
    <div className="intro__modal">
      <div className="content">
        <h1 className="heading">Rules</h1>
        <div className="image__wrapper">
          <img
            className="image"
            src="./ruless.svg"
            alt="rules"
          />
        </div>
        <p className="rules">
          Scissors cuts Paper, Paper covers Rock, Rock crushes Lizard, Lizard
          poisons Spock, Spock smashes Scissors, Scissors decapitates Lizard,
          Lizard eats Paper, Paper disproves Spock, Spock vaporizes Rock, (and
          as it always has) Rock crushes Scissors. Game up to 10 wins, good
          luck...
        </p>
        <div className="checkbox__wrapper">
          <input
            className="checkbox"
            type="checkbox"
            id="rules"
            onChange={() => setCheckbox(!checkbox)}
          />
          <label className="label label--rules" htmlFor="rules">
            I have read the rules
          </label>
        </div>
        <div className="username__wrapper">
          <label className="label label--username" htmlFor="user">
            Player 1
          </label>
          <input
            className="input input--username"
            type="text"
            id="user"
            placeholder="User name.."
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="pcname__wrapper">
          <label className="label label--pcname" htmlFor="pc">
            Player 2
          </label>
          <input
            className="input input--pcname"
            id="pc"
            type="text"
            placeholder="PC name.."
            onChange={(e) => setPcName(e.target.value)}
          />
        </div>

        <button
          className="button"
          disabled={!isValid}
          onClick={() => handleClick()}
        >
          Let's play
        </button>
      </div>
    </div>
  );
};
export default IntroModal;
