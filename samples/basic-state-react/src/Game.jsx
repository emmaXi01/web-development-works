import React, { useState } from 'react';
import Choose from './Choose';
import Choice from './Choice';
import Result from './Result';

import { randomComputerPick } from './rps-logic';

const Game = () => {

  const [userPick, setUserPick] = useState();
  const [computerPick, setComputerPick] = useState( randomComputerPick() );

  if(!userPick) {
    return (
      <Choose onChoice={ (choice) => setUserPick(choice) }/>
    );
  }

  return (
    <div>
      <Choice choice={userPick}/>
      <Choice choice={computerPick}/>
      <Result
        choices={[userPick, computerPick]}
        playAgain={() => {
          setUserPick(null);
          setComputerPick(randomComputerPick());
        }}
      />
    </div>
  );
};
export default Game;
