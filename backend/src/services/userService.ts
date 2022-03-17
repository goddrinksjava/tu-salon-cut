import argon2 from 'argon2';
import User from '../types/user';
import { DatabaseError } from 'pg';
import db from '../knex';

const createUser = async (
  email: string,
  plain_password: string,
): Promise<User | 'EmailTaken'> => {
  const hashed_password = await argon2.hash(plain_password, {
    type: argon2.argon2id,
  });

  try {
    const user = await db('users')
      .insert({
        email,
        hashed_password,
      })
      .returning('*');

    return user.at(0);
  } catch (err) {
    if (err instanceof DatabaseError && err.code == '23505') {
      return 'EmailTaken';
    }
    throw err;
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  return db('users').select().where({ email }).first();
};

export { createUser, getUserByEmail };
