import React from 'react';
import { topN } from './catInfo';

const Cats = ({ count }) => {

  return (
    <ul>
      { topN(count).map( cat => (<li key={cat}>{cat}</li>) ) }
    </ul>
  );
};

export default Cats;
