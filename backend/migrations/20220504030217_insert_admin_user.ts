import { Knex } from 'knex';
import argon2 from 'argon2';

export async function up(knex: Knex): Promise<void> {
  await knex('users').insert({
    email: 'admin@alumno.udg.mx',
    hashed_password: await argon2.hash('adminPassword', {
      type: argon2.argon2id,
    }),
    email_validated_at: knex.fn.now() as any,
    is_admin: true,
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex('users').del().where({ email: 'admin@alumno.udg.mx' });
}
