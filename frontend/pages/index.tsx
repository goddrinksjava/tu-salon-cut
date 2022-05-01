import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';
import Dialog from '../components/ClassroomPicker';
import SearchBar from '../components/SearchBar';
import buildings from '../json/buildings.json';

const Home: NextPage<{ classrooms: string[] }> = ({ classrooms }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="absolute">
      <div className="p-2">
        <SearchBar list={classrooms} />
      </div>
      <div className="relative">
        <img src="/map.jpg" alt="mapa" className="" />
        {buildings.map((b) => (
          <button
            className="absolute bg-red-700 opacity-40"
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: `${b.w}%`,
              height: `${b.h}%`,
            }}
            title={`Edificio ${b.building}`}
            onClick={() => setIsDialogOpen(true)}
          />
        ))}
      </div>
      <Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <div className="w-32 h-32 bg-neutral-900" />
      </Dialog>
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
