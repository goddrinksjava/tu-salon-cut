import express from 'express';
const profileRouter = express.Router();

import { Request, Response, NextFunction } from 'express';
import User from '../types/user';

type ProfileRequest = Request & { user: User };

profileRouter.get(
  '/',
  function (req: ProfileRequest, res: Response, next: NextFunction) {
    res.send(req.user);
  },
);

export default profileRouter;
