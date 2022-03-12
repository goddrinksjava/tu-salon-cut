import { signJwt } from '../auth/signJwt';
import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import argon2 from 'argon2';
import { createUser, getUserByEmail } from '../services/userService';
import Credentials from '@shared/dto/credentials';

const authRouter: Router = express.Router();

authRouter.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserByEmail(req.body.email);

      if (!user) {
        return res.sendStatus(403);
      }

      if (await argon2.verify(user.hashed_password, req.body.password)) {
        res.cookie('access_token', `Bearer ${signJwt(user)}`, {
          httpOnly: true,
        });
      } else {
        return res.sendStatus(403);
      }
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction) => {
    const authError = new Error('Failed to authenticate');

    if (!req.body.email || !req.body.password) {
      next(authError);
    }

    try {
      const result = await createUser(
        req.body.email,
        req.body.password,
        'user',
      );
      if (result == 'EmailTaken') {
        next(new Error('Email Taken'));
      } else {
        res.json(signJwt(result));
      }
    } catch (err) {
      next(err);
    }
  },
);

export default authRouter;
