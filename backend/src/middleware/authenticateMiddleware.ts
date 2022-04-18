import { NextFunction, Request, Response } from 'express';

//TODO cache returned function
const authenticate =
  ({ mustBeAdmin } = { mustBeAdmin: false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;
    console.log(req.sessionID);

    if (!user) {
      return res.sendStatus(401);
    }

    if (mustBeAdmin && !user.isAdmin) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  };

export default authenticate;
