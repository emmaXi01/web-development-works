import React from 'react';
import { sort } from './sorting';

const ShowList = ({
  students,
  sortBy
}) => {

  const rows = sort({ by: sortBy, list: students}).map( student => (
    <div key={student.name} className="student">
      <span>{student.name}</span>
      <span>{student.age}</span>
      <span>{student.grade}</span>
    </div>
  ) );


  return (
    <div className="student-list">
      {rows}
    </div>
  );
};

export default ShowList;

