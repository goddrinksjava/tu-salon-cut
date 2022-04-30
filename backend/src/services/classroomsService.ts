import db from '../knex';

export const getClassrooms = async () => {
  const result = await db('classrooms').pluck('id');
  return result;
};

export const getWorstClassrooms = async (n: number = 5) => {
  const result = await db('classroom_complaints')
    .select('fk_classroom')
    .count('fk_classroom')
    .groupBy('fk_classroom')
    .orderBy('count', 'desc')
    .limit(n);

  return result;
};
