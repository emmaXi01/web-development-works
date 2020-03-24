import React, {useState} from 'react';
import Cats from './Cats';
import Counter from './Counter';

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
        <Counter
          count={count}
          changeCount={(newCount) => setCount(newCount) }
        />
        <Cats count={count}/>
    </div>
  );
}

export default App;
