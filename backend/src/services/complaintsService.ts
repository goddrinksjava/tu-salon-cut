import db from '../knex';

const createComplaints = async (
  userId: number,
  classroomId: number,
  classroomProblemsId: [number],
): Promise<void> => {
  const inserts = classroomProblemsId.map((classroomProblemId) => ({
    fk_user: userId,
    fk_classroom: classroomId,
    fk_classroom_problem: classroomProblemId,
  }));

  await db('classroom_complaints').insert(inserts).onConflict().ignore();
};

export { createComplaints };
