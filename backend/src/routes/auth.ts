import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import argon2 from 'argon2';
import { createUser, getUserByEmail } from '../services/userService';
import validateBody from '../middleware/validateMiddleware';
import { credentialsSchema } from '../schema/credentials';

const authRouter: Router = express.Router();

authRouter.post(
  '/login',
  validateBody(credentialsSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserByEmail(req.body.email);

      if (
        user &&
        (await argon2.verify(user.hashed_password, req.body.password))
      ) {
        req.session.user = {
          id: user.id,
          email: user.email,
          isAdmin: user.is_admin,
        };
        return res.sendStatus(200);
      }

      res.status(403);
      return res.json({ error: 'Email o contraseña incorrectos' });
    } catch (err) {
      next(err);
    }
  },
);

authRouter.post(
  '/signup',
  validateBody(credentialsSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createUser(req.body.email, req.body.password);
      if (result == 'EmailTaken') {
        return res.json({ error: 'Este email ya ha sido registrado' });
      }

      req.session.user = {
        id: result.id,
        email: result.email,
        isAdmin: result.is_admin,
      };

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
);

export default authRouter;
