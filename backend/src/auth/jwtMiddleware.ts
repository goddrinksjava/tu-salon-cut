import jwtConfig from 'config/jwtConfig';
import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { string } from 'yup';

const jwtMiddleware = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.sendStatus(403);
  }

  try {
    const payload = jwt.verify(token, jwtConfig.secret);
    req.user = payload;
    next();
  } catch {
    return res.sendStatus(403);
  }
};

export default jwtMiddleware;
