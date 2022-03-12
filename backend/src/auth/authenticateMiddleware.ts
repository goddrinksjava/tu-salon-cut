import jwtConfig from '../config/jwtConfig';
import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction,
) => {};

export default authenticate;
