/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './LevelModal.scss';

type Props = {
  closeModal: (arg: boolean) => void;
  hideGame: (arg: boolean) => void;
  level: (arg: string) => void;
};

const LevelModal: React.FC<Props> = ({ closeModal, hideGame, level }) => {
  const handleClick = () => {
    closeModal(false);
    hideGame(false);
  };

  return (
    <div className="level__modal">
      <button className="button button--close" onClick={() => handleClick()}>
        X

      </button>
      <div className="content">
        <h1 className="heading">game level</h1>
        {['Easy', 'Medium', 'Hard'].map((it) => (
          <button
            className="button"
            onClick={() => {
              handleClick();
              level(it);
            }}
            key={it}
          >
            {it}
          </button>
        ))}

      </div>
    </div>
  );
};

export default LevelModal;
