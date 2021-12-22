import React from 'react';
import './StatsModal.scss';

export type Statistics = {
  name: string;
  level: string;
  date: string;
};

type Props = {
  closeModal: (arg: boolean) => void;
  hideGame: (arg: boolean) => void;
  stats: Statistics[];
};

const StatsModal: React.FC<Props> = ({ closeModal, hideGame, stats }) => {
  const handleClick = () => {
    closeModal(false);
    hideGame(false);
  };

  return (
    <div className="stats__modal">
      <button className="button button--close" onClick={() => handleClick()}>
        x
      </button>
      <h1 className="heading">Results</h1>
      <div className="wrapper">
        <ol className="list">
          {stats.map(({ name, level, date }) => (
            <li className="list__item" key={date}>
              {`Name: ${name} --- Level: ${level} --- Date: ${date}`}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default StatsModal;
