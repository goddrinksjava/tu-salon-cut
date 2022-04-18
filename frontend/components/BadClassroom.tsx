import { DisappointedFace } from '@icon-park/react';
import Link from 'next/link';
import React, { FC } from 'react';

interface IBadClassroomProps {
  name: string;
  nComplaints: string;
}

const BadClassroom: FC<IBadClassroomProps> = ({
  name,
  nComplaints: complaints,
}) => {
  return (
    <Link href={`/classrooms/${name}`}>
      <a>
        <div
          role="alert"
          className="flex justify-between mt-4 border border-gray-400 rounded bg-gray-100 px-4 py-3 text-gray-700"
        >
          <p>{name}</p>

          <div className="flex space-x-2">
            <DisappointedFace theme="outline" size="24" fill="#333" />
            <p>x{complaints}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BadClassroom;
