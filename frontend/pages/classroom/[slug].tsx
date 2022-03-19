import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import ClassroomProblem from '../../components/ClassroomProblem';

interface IClassroomProblemsProps {
  label: string;
  count: string;
  checked: boolean;
}

const ClassroomProblems: NextPage<{ data: IClassroomProblemsProps[] }> = (
  props,
) => {
  return (
    <>
      {props.data.map(({ label, count, checked }) => {
        return <ClassroomProblem label={label} count={count} />;
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  if (!req.cookies['connect.sid']) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  console.log(query.slug);

  const response = await fetch(`http://backend:4000/classroom/${query.slug}`, {
    credentials: 'include',
    headers: {
      cookie: `connect.sid=${req.cookies['connect.sid']}`,
    },
  });

  console.log(response);

  //TODO handle 404
  if (response.ok) {
    const data = await response.json();
    return { props: { data } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
};

export default ClassroomProblems;
