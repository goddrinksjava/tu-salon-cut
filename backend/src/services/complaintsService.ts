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
  classroomProblemsId: [number],
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

const getComplaints = async (classroomId: number): Promise<any> => {
  // Note that in Postgres, count returns a bigint type which will be a String and not a Number
  const complaints = new Map<string, string>();

  const result = await db('classroom_complaints')
    .join(
      'classroom_problems',
      'classroom_problems.id',
      'classroom_complaints.fk_classroom_problem',
    )
    .count('*')
    .select('classroom_problems.label')
    .where({ fk_classroom: classroomId })
    .groupBy('classroom_problems.label');

  return result;
};

export { getComplaints, setComplaints };
