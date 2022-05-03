import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import ClassroomPicker from '../components/ClassroomPicker';
import SearchBar from '../components/SearchBar';
import buildings from '../json/buildings.json';

const Home: NextPage<{ classrooms: string[] }> = ({ classrooms }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [building, setBuilding] = useState('');

  return (
    <div className="absolute max-h-full max-w-full overflow-y-scroll">
      <div className="p-2">
        <SearchBar list={classrooms} />
      </div>
      <div className="relative">
        <img src="/map.jpg" alt="mapa" className="" />
        {buildings.map((b) => (
          <button
            key={b.building}
            className="absolute bg-red-700 opacity-40"
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

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(`${process.env.API_PATH}/classrooms`);

  if (response.ok) {
    const classrooms = await response.json();
    return { props: { classrooms } };
  } else if (response.status == 404) {
    return {
      notFound: true,
    };
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
