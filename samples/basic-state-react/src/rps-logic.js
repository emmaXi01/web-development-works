export const choices = ['Rock', 'Paper', 'Scissors'];

export const randomComputerPick = () =>
  choices[Math.floor(Math.random()*choices.length)];

export const findWinner = ( first, second ) => {
  if(first === second) {
    return 'Tie';
  }

  if(choices.indexOf(second) === choices.indexOf(first)+1) {
    return second;
  }

  if(choices.indexOf(first) === choices.indexOf(second)+1) {
    return first;
  }

  if(choices.indexOf(first) === 0 && choices.indexOf(second) === choices.length - 1) {
    return first;
  }

  if(choices.indexOf(second) === 0 && choices.indexOf(first) === choices.length - 1) {
    return second;
  }

  return 'oops';
};
