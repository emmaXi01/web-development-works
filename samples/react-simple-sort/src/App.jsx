import React, { useState } from 'react';

import { getStudents } from './students';

import Controls from './Controls';
import ShowList from './ShowList';
import './app.css';

function App() {
  const [ students ] = useState(getStudents());
  const [ sortBy, setSortBy] = useState();

  return (
    <div className="app">
      <Controls sortBy={sortBy} setSortBy={setSortBy}/>
      <ShowList students={students} sortBy={sortBy}/>
    </div>
  );
}

export default App;
