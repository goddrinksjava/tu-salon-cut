import pool from 'pool';
import User from 'types/user';
import argon2 from 'argon2';

const createUser = async (
  email: string,
  plain_password: string,
  fk_app_role: string,
): Promise<User | 'EmailTaken'> => {
  const hashed_password = await argon2.hash(plain_password);

  try {
    const { rows } = await pool.query(
      'INSERT INTO user (email, hashed_password, fk_app_role) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, hashed_password, fk_app_role],
    );
    return rows.at(0) as Promise<User>;
  } catch (err) {
    if (err.code == '23505') {
      return 'EmailTaken';
    }
    throw err;
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return rows.at(0);
};

export { createUser, getUserByEmail };
