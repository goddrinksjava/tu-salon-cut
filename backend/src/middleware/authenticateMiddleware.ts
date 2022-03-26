import { NextFunction, Request, Response } from 'express';

//TODO cache returned function
const authenticate =
  ({ mustBeAdmin } = { mustBeAdmin: false }) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;

    console.log(req.sessionID);

    if (user && (!mustBeAdmin || user.isAdmin)) {
      req.user = user;
      return next();
    }

    res.sendStatus(403);
  };

export default authenticate;
