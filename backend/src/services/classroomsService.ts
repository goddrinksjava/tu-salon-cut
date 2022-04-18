import db from '../knex';

const getWorstClassrooms = async (n: number = 5) => {
  const result = await db('classroom_complaints')
    .select('fk_classroom')
    .count('fk_classroom')
    .groupBy('fk_classroom')
    .orderBy('count', 'desc')
    .limit(n);

  return result;
};

export { getWorstClassrooms };
