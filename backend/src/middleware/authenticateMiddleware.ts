import { NextFunction, Request, Response } from 'express';
import { isEmailValidated } from '../services/userService';

//TODO cache returned function
const authenticate =
  ({ mustBeAdmin } = { mustBeAdmin: false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    console.log(req.sessionID);

    if (!user) {
      res.status(401);
      return res.json({ error: 'unauthenticated' });
    }

    if (!user.isVerified) {
      const isVerified = isEmailValidated(user.id);

      if (!isVerified) {
        res.status(403);
        return res.json({ error: 'emailNotVerified' });
      }

      user.isVerified = true;
    }

    if (mustBeAdmin && !user.isAdmin) {
      res.status(403);
      return res.json({ error: 'forbidden' });
    }

    req.user = user;
    next();
  };

export default authenticate;
