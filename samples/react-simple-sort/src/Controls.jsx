import React from 'react';
import { methods } from './sorting';

const Controls = ({
  sortBy,
  setSortBy,
}) => {
  const buttons = Object.keys(methods).map( method => (
    <div
      key={method}
      className={ method === sortBy ? 'active' : ''}
      onClick={ () => setSortBy(method) }
    >
      {methods[method]}
    </div>
  ));
  return (
    <div className="controls">
      {buttons}
    </div>
  );
};

export default Controls;
