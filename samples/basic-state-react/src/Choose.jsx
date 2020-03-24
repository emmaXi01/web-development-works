import React from 'react';
import {choices} from './rps-logic';

const Choose = ({ onChoice }) => {
  const buttons = choices.map( choice => {
    return(
      <button key={choice} onClick={ () => onChoice(choice)}>{choice}</button>
    );
  });

  return (
    <div>
      It's dangerous to go alone, take one of these:
      { buttons }
    </div>
  );
};
export default Choose;
