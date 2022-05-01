import type { GetStaticProps, NextPage } from 'next';
import SearchBar from '../components/SearchBar';
import buildings from '../json/buildings.json';

const Home: NextPage<{ classrooms: string[] }> = ({ classrooms }) => {
  return (
    <>
      <div className="p-2">
        <SearchBar list={classrooms} />
      </div>
      <div className="relative">
        <img src="/map.jpg" alt="mapa" />
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
          />
        ))}
      </div>
    </>
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
