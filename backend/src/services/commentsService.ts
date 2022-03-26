import db from '../knex';

const setComment = async (
  userId: number,
  classroomId: string,
  comment: string,
) => {
  db('classroom_comments')
    .insert({
      fk_user: userId,
      fk_classroom: classroomId,
      comment,
    })
    .onConflict()
    .merge();
};

const getComment = async (
  userId: number,
  classroomId: string,
): Promise<string | null> => {
  return db('classroom_comments')
    .pluck('comment')
    .where({ fk_user: userId, fk_classroom: classroomId });
};

const getClassroomComments = async (classroomId: string): Promise<string[]> => {
  return db('classroom_comments')
    .pluck('comment')
    .where({ fk_classroom: classroomId });
};

export { setComment, getComment, getClassroomComments };
