import db from '../knex';

const getWorstClassrooms = async (n: number = 10) => {
  const result = await db('classroom_complaints')
    .select('fk_classroom')
    .count('fk_classroom')
    .groupBy('fk_classroom')
    .orderBy('count', 'desc');

  return result;
};

export { getWorstClassrooms };
