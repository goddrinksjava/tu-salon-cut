import { NextFunction, Request, Response, Router } from 'express';

const authenticate =
  ({ adminOnly = false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;

    if (user && (!adminOnly || user.isAdmin)) {
      req.user = user;
      return next();
    }

    res.send(403);
  };

export default authenticate;
