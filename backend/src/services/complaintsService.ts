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

  db.transaction(async (trx) => {
    await db('classroom_complaints')
      .transacting(trx)
      .del()
      .where({ fk_user: userId, fk_classroom: classroomId })
      .insert(inserts)
      .then(trx.commit)
      .catch(trx.rollback);

    await db('classroom_complaints')
      .transacting(trx)
      .insert(inserts)
      .then(trx.commit)
      .catch(trx.rollback);
  });
};

const getComplaints = async (
  classroomId: number,
): Promise<{ label: string; count: string }[]> => {
  const result = await db('classroom_problems')
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

export { getComplaints, setComplaints };
