import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ClassroomProblem from '../../components/ClassroomProblem';
import AppButton from '../../components/AppButton';
import { useRouter } from 'next/router';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface IClassroomProblemsProps {
  id: number;
  label: string;
  count: string;
  checked: boolean;
}

const ClassroomProblems: NextPage<{
  data: IClassroomProblemsProps[];
}> = ({ data }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [sending, setSending] = useState(false);

  const stateArray = data.map(({ checked }) => useState(checked));

  const save = async () => {
    setSending(true);

    // const response = await fetch('/api/auth/signup', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(submitData),
    // });

    let submitData: { classroomProblemsId: number[] } = {
      classroomProblemsId: [],
    };

    for (let i = 0; i < stateArray.length; i++) {
      if (stateArray[i][0]) {
        submitData.classroomProblemsId.push(data[i].id);
      }
    }

    console.log(submitData);

    const response = await fetch('/api/classroom/' + slug, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

    console.log(response);

    setSending(false);
  };

  return (
    <>
      {data.map(({ id, label, count, checked }, i) => {
        return (
          <ClassroomProblem
            key={id}
            label={label}
            count={parseInt(count)}
            checked={stateArray[i][0]}
            setChecked={stateArray[i][1]}
          />
        );
      })}
      <div className="mt-4">
        <AppButton color="cyan" disabled={sending} onclick={save}>
          Guardar
        </AppButton>
      </div>
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

  const response = await fetch(
    `${process.env.API_PATH}/classroom/${query.slug}`,
    {
      credentials: 'include',
      headers: {
        cookie: `connect.sid=${req.cookies['connect.sid']}`,
      },
    },
  );

  console.log(response);

  if (response.ok) {
    const data = await response.json();
    return { props: { data } };
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
