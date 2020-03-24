import React, {useState} from 'react';
import Game from './Game';
import Login from './Login';


function App() {
  const [userState, setUserState] = useState({
    isLoggedIn: false
  });

  return (
    <div className="App">
      { userState.isLoggedIn ?
          <Game/> :
          <Login onLogin={ isLoggedIn => setUserState({isLoggedIn}) } />
      }
    </div>
  );
}

export default App;
