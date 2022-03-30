import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import AppInfo from '../../../components/AppInfo';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface IClassroomComments {
  email: string;
  comment: string;
  updated_at: string;
}

const ClassroomProblems: NextPage<{
  comments: IClassroomComments[];
}> = ({ comments }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {comments.map(({ email, comment, updated_at }, i) => {
        return (
          <div className="pt-2 px-6">
            <AppInfo key={email}>
              <div className="flex justify-between pb-4">
                <p className="font-bold">{email}</p>
                <p className="font-bold">{updated_at}</p>
              </div>
              <p>{comment}</p>
            </AppInfo>
          </div>
        );
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

  console.log(query.id);

  const response = await fetch(
    `${process.env.API_PATH}/comments/all/${query.id}`,
    {
      credentials: 'include',
      headers: {
        cookie: `connect.sid=${req.cookies['connect.sid']}`,
      },
    },
  );

  if (response.ok) {
    const comments = await response.json();
    console.log(comments);
    return { props: comments };
  } else if (response.status == 404) {
    return {
      notFound: true,
    };
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
