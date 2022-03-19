import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import argon2 from 'argon2';
import { createUser, getUserByEmail } from '../services/userService';
import validateBody from '../middleware/validateMiddleware';
import { credentialsSchema } from '../schema/credentials';

const authRouter: Router = express.Router();

authRouter.get(
  '/logout',
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send('Unable to log out');
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(200);
    }
  },
);

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

        req.session.save(function (err) {
          console.error(err);
          next(err);
        });

        console.log(req.session);

        return res.sendStatus(200);
      }

      return res.status(403).json({ error: 'Email o contraseña incorrectos' });
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
        return res
          .status(400)
          .json({ error: 'Este email ya ha sido registrado' });
      }

      req.session.user = {
        id: result.id,
        email: result.email,
        isAdmin: result.is_admin,
      };

      req.session.save(function (err) {
        console.error(err);
        next(err);
      });

      console.log(req.session);

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
);

export default authRouter;
