import React, { useReducer } from 'react';
import './App.css';
import reducer from './reducer';

const App = () => {
  const initState = {
    username: 'bao',
    actualName: 'Wu Bao',
    avatar: 'https://examplecat.com/cat.png',
    theme: 'light',
    lastActive: 1585797861760, // Date.now() - ms since Epoch
  };

  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div className={state.theme}>
      <select value={state.theme} onChange={(e) => dispatch({
        type: 'changeTheme',
        theme: e.target.value
      })}>
      { [ 'light', 'dark' ].map(
        item => <option key={item} value={item}>{item}</option>
        ) }
      </select>
    </div>
  );
}

export default App;
