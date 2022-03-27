import React, { useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import ClassroomProblem from '../../components/ClassroomProblem';
import AppButton from '../../components/AppButton';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface IClassroomComplaints {
  id: number;
  label: string;
  count: string;
  checked: boolean;
}

const ClassroomProblems: NextPage<{
  complaints: IClassroomComplaints[];
  comment: string | null;
}> = ({ complaints, comment }) => {
  const router = useRouter();
  const { id } = router.query;

  const [saving, setSaving] = useState(false);
  const [commentState, setCommentState] = useState<string | null>(comment);

  const stateArray = complaints.map(({ checked }) => useState(checked));

  const save = async () => {
    setSaving(true);

    let submitData: { classroomProblemsId: number[] } = {
      classroomProblemsId: [],
    };

    for (let i = 0; i < stateArray.length; i++) {
      if (stateArray[i][0]) {
        submitData.classroomProblemsId.push(complaints[i].id);
      }
    }

    console.log(submitData);

    const complaintsResponse = await fetch('/api/complaints/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submitData),
    });

    const commentResponse = await fetch('/api/comments/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: commentState }),
    });

    if (complaintsResponse.ok && commentResponse.ok) {
      toast('Datos guardados', {
        type: 'success',
      });
    } else {
      if (!complaintsResponse.ok) {
        toast('Error al guardar las quejas', {
          type: 'error',
        });
      }

      if (!commentResponse.ok) {
        toast('Error al guardar el comentario', {
          type: 'error',
        });
      }
    }

    setSaving(false);
  };

  return (
    <>
      <ToastContainer />
      <h1 className="text-5xl">{id}</h1>
      <div className="bg-white flex justify-center">
        <div className="flex-auto flex flex-col pt-8 px-6 mx-auto w-5/12">
          <label htmlFor="comment" className="text-gray-600 pb-4">
            Comentario
          </label>

          <textarea
            name="comment"
            value={commentState ?? ''}
            onChange={(e) => setCommentState(e.target.value)}
            rows={5}
            className="block resize-none w-full h-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>

        <div className="pt-8 px-6 mx-auto w-7/12">
          {complaints.map(({ id, label, count, checked }, i) => {
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
        </div>
      </div>

      <div className="mt-4 pt-8 px-6 mx-auto">
        <AppButton color="cyan" disabled={saving} onclick={save}>
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

  console.log(query.id);

  const complaintsPromise = fetch(
    `${process.env.API_PATH}/complaints/${query.id}`,
    {
      headers: {
        cookie: `connect.sid=${req.cookies['connect.sid']}`,
      },
    },
  );

  const commentPromise = fetch(`${process.env.API_PATH}/comments/${query.id}`, {
    headers: {
      cookie: `connect.sid=${req.cookies['connect.sid']}`,
    },
  });

  const [complaintsResponse, commentResponse] = await Promise.all([
    complaintsPromise,
    commentPromise,
  ]);

  if (complaintsResponse.ok && commentResponse.ok) {
    const complaints = await complaintsResponse.json();
    const { comment } = await commentResponse.json();

    return {
      props: {
        complaints,
        comment,
      },
    };
  } else if (complaintsResponse.status == 404) {
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
