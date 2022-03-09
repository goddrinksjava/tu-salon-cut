import { signJwt } from 'auth/signJwt';
import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import argon2 from 'argon2';
import { createUser, getUserByEmail } from 'services/userService';
import Credentials from 'shared/dto/credentials';

const authRouter: Router = express.Router();

type AuthRequest = Request & Credentials;

authRouter.post(
  '/login',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authError = new Error('Failed to authenticate');

    try {
      const user = await getUserByEmail(req.email);

      if (!user) {
        next(authError);
      }

      if (await argon2.verify(user.hashed_password, req.password)) {
        res.cookie('access_token', `Bearer ${signJwt(user)}`, {
          httpOnly: true,
        });
      } else {
        next(authError);
      }
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post(
  '/signup',
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authError = new Error('Failed to authenticate');

    if (!req.email || !req.password) {
      next(authError);
    }

    const result = await createUser(req.email, req.password, 'user');

    if (result == 'EmailTaken') {
      next(new Error('Email Taken'));
    } else {
      res.cookie('access_token', `Bearer ${signJwt(result)}`, {
        httpOnly: true,
      });
    }
  },
);

export default authRouter;
