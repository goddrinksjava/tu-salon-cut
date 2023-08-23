import { Knex } from 'knex';
import argon2 from 'argon2';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      email: 'admin@alumno.udg.mx',
      hashed_password: await argon2.hash('adminPassword', {
        type: argon2.argon2id,
      }),
      email_validated_at: knex.fn.now() as any,
      is_admin: true,
    },
    {
      email: 'user@alumno.udg.mx',
      hashed_password: await argon2.hash('userPassword', {
        type: argon2.argon2id,
      }),
      email_validated_at: knex.fn.now() as any,
    },
    {
      email: 'user2@alumno.udg.mx',
      hashed_password: await argon2.hash('user2Password', {
        type: argon2.argon2id,
      }),
      email_validated_at: knex.fn.now() as any,
    },
  ]);
}
