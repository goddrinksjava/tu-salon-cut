import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('classrooms', function (table) {
    table.increments();
    table.text('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('classrooms');
}
