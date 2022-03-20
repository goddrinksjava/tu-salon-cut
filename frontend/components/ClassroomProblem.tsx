import React, { FC, useEffect, useRef, useState } from 'react';

interface IClassroomProblemProps {
  label: string;
  count: number;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

const ClassroomProblem: FC<IClassroomProblemProps> = ({
  label,
  count,
  checked,
  setChecked,
}) => {
  const uiCount = useRef(count - (checked ? 1 : 0));

  const cl = (checked: boolean) => {
    if (checked) {
      return 'cursor-pointer flex justify-between mt-4 border border-rose-400 rounded bg-rose-100 px-4 py-3 text-rose-700';
    }

    return 'cursor-pointer flex justify-between mt-4 border border-gray-400 rounded bg-gray-100 px-4 py-3 text-gray-700';
  };

  const toggle = () => {
    setChecked(!checked);
  };

  return (
    <div role="alert" className={cl(checked)} onClick={toggle}>
      <p className="select-none">{label}</p>
      <p className="select-none">{uiCount.current + (checked ? 1 : 0)}</p>
    </div>
  );
};

export default ClassroomProblem;
