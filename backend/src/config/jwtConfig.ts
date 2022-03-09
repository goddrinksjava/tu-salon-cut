import { SignOptions } from 'jsonwebtoken';

const signOptions: SignOptions = { expiresIn: '1h' };

export default {
  secret: process.env.JWT_SECRET,
  signOptions,
};
