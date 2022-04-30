import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import SearchBar from '../components/SearchBar';
import styles from '../styles/Home.module.css';

const Home: NextPage<{ classrooms: string[] }> = ({ classrooms }) => {
  return (
    <div className="p-2">
      <SearchBar list={classrooms} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
