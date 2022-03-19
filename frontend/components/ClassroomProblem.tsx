import React, { FC } from 'react';

interface IClassroomProblemProps {
  label: string;
  count: string;
}

const ClassroomProblem: FC<IClassroomProblemProps> = ({ label, count }) => {
  return (
    <div
      role="alert"
      className="flex justify-between mt-4 border border-rose-400 rounded bg-red-100 px-4 py-3 text-red-700"
    >
      <p>{label}</p>
      <p>{count}</p>
    </div>
  );
};

export default ClassroomProblem;
