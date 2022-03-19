import db from '../knex';

/**
 * Creates complaints for the given user and classroom
 *
 * @remarks
 * Deletes complaints that are not in classroomProblemsId for the given user and classroom.
 *
 */

const setComplaints = async (
  userId: number,
  classroomId: number,
  classroomProblemsId: number[],
): Promise<void> => {
  const inserts = classroomProblemsId.map((classroomProblemId) => ({
    fk_user: userId,
    fk_classroom: classroomId,
    fk_classroom_problem: classroomProblemId,
  }));

  const trx = await db.transaction();

  try {
    await db('classroom_complaints')
      .transacting(trx)
      .del()
      .where({ fk_user: userId, fk_classroom: classroomId })
      .insert(inserts);

    await db('classroom_complaints').transacting(trx).insert(inserts);

    await trx.commit();
  } catch (err) {
    trx.rollback(err);
  }
};

interface IGetComplaintsWithCheckedByUserOutput {
  label: string;
  count: string;
  checked: boolean;
}

const getComplaintsWithCheckedByUser = async (
  classroomId: number,
  userId: number,
): Promise<IGetComplaintsWithCheckedByUserOutput[]> => {
  const promise1 = getComplaints(classroomId);
  const promise2 = getUserComplaints(classroomId, userId);

  const [complaints, userComplaints] = await Promise.all([promise1, promise2]);

  return complaints.map((complaint) => {
    const result = complaint as IGetComplaintsWithCheckedByUserOutput;
    result.checked = userComplaints.includes(result.label);
    console.log(result);
    return result;
  });
};

const getComplaints = async (
  classroomId: number,
): Promise<{ label: string; count: string }[]> => {
  const result = db('classroom_problems')
    .leftJoin('classroom_complaints', function () {
      this.on(
        'classroom_problems.id',
        'classroom_complaints.fk_classroom_problem',
      ).andOnVal('classroom_complaints.fk_classroom', classroomId);
    })
    .count('classroom_complaints.fk_classroom_problem')
    .select('classroom_problems.label')
    .groupBy('classroom_problems.label');

  return result;
};

const getUserComplaints = async (
  classroomId: number,
  userId: number,
): Promise<string[]> => {
  const result = db('classroom_complaints')
    .join(
      'classroom_problems',
      'classroom_problems.id',
      'classroom_complaints.fk_classroom_problem',
    )
    .pluck('classroom_problems.label')
    .where({ fk_classroom: classroomId, fk_user: userId });

  return result;
};

export {
  getComplaints,
  getUserComplaints,
  getComplaintsWithCheckedByUser,
  setComplaints,
};
