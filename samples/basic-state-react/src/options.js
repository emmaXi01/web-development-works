export const choices = ['Rock', 'Paper', 'Scissors'];

export const randomComputerPick = () =>
  choices[Math.floor(Math.random()*choices.length)];

