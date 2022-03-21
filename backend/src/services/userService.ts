import argon2 from 'argon2';
import User from '../types/user';
import { DatabaseError } from 'pg';
import db from '../knex';
import transporter from '../transporter';
import redis from '../redis';
import { v4 as uuidv4 } from 'uuid';

const createUser = async (
  email: string,
  plain_password: string,
): Promise<User | 'EmailTaken'> => {
  const hashed_password = await argon2.hash(plain_password, {
    type: argon2.argon2id,
  });

  try {
    const result = await db('users')
      .insert({
        email,
        hashed_password,
      })
      .returning('*');

    const user = result.at(0);

    await sendConfirmationEmail(user.id, user.email); //TODO handle exception

    return user;
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

const sendConfirmationEmail = async (userId: number, userEmail: string) => {
  const uuid = uuidv4();
  redis.set(uuid, userId);

  let info = await transporter.sendMail({
    from: 'confirmation@tu_salon_cut.com',
    to: userEmail,
    subject: 'Tu Salón CUT',
    text: `Ingresa al siguiente link para activar tu cuenta: http://localhost:3000/confirm/${uuid}`,
  });
};

const confirmEmail = async (uuid: string) => {
  //TODO handle exceptions

  const userId = await redis.get(uuid);

  await db('users')
    .update({ email_validated_at: db.fn.now() as any })
    .where({ id: parseInt(userId) });

  redis.del(uuid);
};

export { createUser, getUserByEmail };
