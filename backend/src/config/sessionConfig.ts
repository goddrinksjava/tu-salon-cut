import { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
  // Use an array of secrets to support key rotation as an additional security measure.
  secret: process.env.SESSION_SECRETS.split(' '),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

export default sessionConfig;
