const students = [
  { name: 'Maru',
    grade: 'A',
    age: 7,
  },
  { name: 'Grumpy Cat',
    grade: 'F',
    age: 13,
  },
  { name: 'Morris',
    grade: 'B',
    age: 47,
  },
  { name: 'Scratch Fury',
    grade: 'A',
    age: 3,
  },
];

export const getStudents = () => [...students];

