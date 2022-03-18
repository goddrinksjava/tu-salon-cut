import { Knex } from 'knex';

const names = [
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
    names.map((name) => ({
      name,
    })),
  );
}

export async function down(knex: Knex): Promise<void> {
  await knex('classrooms').del().whereIn('name', names);
}
