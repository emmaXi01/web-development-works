export const methods = {
  name: 'Name',
  age: 'Age',
  grade: 'Grade',
};

export const sort = ({ by, list }) => {
  return [...list].sort( (a, b) => a[by] >= b[by] ? 1 : -1 );
};

