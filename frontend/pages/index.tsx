import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ClassroomPicker from '../components/ClassroomPicker';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import buildings from '../json/buildings.json';
import { UserType } from '../types/userTypes';

const Home: NextPage<{ classrooms: string[]; userType: UserType }> = ({
  classrooms,
  userType,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [building, setBuilding] = useState('');

  return (
    <div className="absolute overflow-y-scroll">
      {/* <Navbar /> */}
      <div className="p-2 flex">
        <SearchBar list={classrooms} />
        <div className="shrink-0 flex justify-start items-center px-4">
          <Link href="login">
            <a className="hover:underline">Iniciar sesión</a>
          </Link>
        </div>
      </div>
      <div className="relative w-full h-fit">
        <img src="/map.jpg" alt="mapa" />
        {buildings.map((b) => (
          <button
            key={b.building}
            className="absolute"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
            title={`Edificio ${b.building}`}
            onClick={() => {
              setBuilding(b.building);
              setIsDialogOpen(true);
            }}
          />
        ))}
      </div>
      <ClassroomPicker
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        building={building}
        classrooms={classrooms}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const classroomsPromise = fetch(`${process.env.API_PATH}/classrooms`);

  const userTypePromise = fetch(`${process.env.API_PATH}/auth/userType`, {
    headers: {
      cookie: `connect.sid=${req.cookies['connect.sid']}`,
    },
  });

  const [classroomsResponse, userTypeResponse] = await Promise.all([
    classroomsPromise,
    userTypePromise,
  ]);

  if (classroomsResponse.ok && userTypeResponse.ok) {
    const classrooms = await classroomsResponse.json();
    const userType = await userTypeResponse.json();
    return { props: { classrooms, userType } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/500',
      },
    };
  }
};

export default Home;
