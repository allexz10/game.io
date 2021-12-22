/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './RulesModal.scss';

type Props = {
  closeModal: (arg: boolean) => void;
  hideGame: (arg: boolean) => void;
};

const RulesModal: React.FC<Props> = ({ closeModal, hideGame }) => {
  const handleClick = () => {
    closeModal(false);
    hideGame(false);
  };
  return (
    <div className="rules__modal">
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
          as it always has) Rock crushes Scissors. Game up to 10 wins or loss of
          health, good luck...
        </p>

        <button className="button" onClick={() => handleClick()}>
          Close
        </button>
      </div>
    </div>
  );
};
export default RulesModal;
