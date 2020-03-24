import React from 'react';
import { findWinner } from './rps-logic';

const Result = ({ choices, playAgain }) => {

  let winner = findWinner(...choices);

  if(winner !== 'Tie') {
    winner = `${winner} wins!`;
  }

  return (
    <div>
      <p>{choices[0]} vs {choices[1]}</p>
      <p>{winner}</p>
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
};
export default Result;
