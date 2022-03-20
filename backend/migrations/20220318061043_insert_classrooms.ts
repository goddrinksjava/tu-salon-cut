import { Knex } from 'knex';

const ids = [
  'A101',
  'A102',
  'A103',
  'B101',
  'B102',
  'B103',
  'C101',
  'C102',
  'C103',
];

export async function up(knex: Knex): Promise<void> {
  await knex('classrooms').insert(
    ids.map((id) => ({
      id,
    })),
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex('classrooms').del().whereIn('id', ids);
}
