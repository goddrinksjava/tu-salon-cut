import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('classroom_complaints', function (table) {
    table.integer('fk_user').notNullable().references('id').inTable('users');
    table
      .integer('fk_classroom')
      .notNullable()
      .references('id')
      .inTable('classrooms');
    table
      .integer('fk_classroom_problem')
      .notNullable()
      .references('id')
      .inTable('classroom_problems');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('classroom_complaints');
}
