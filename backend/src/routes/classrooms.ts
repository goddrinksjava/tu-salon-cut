import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { getWorstClassrooms } from '../services/classroomsService';

const classroomsRouter: Router = express.Router();

classroomsRouter.get(
  '/worst',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const worstClassrooms = await getWorstClassrooms();
      res.json(worstClassrooms);
    } catch (err) {
      next(err);
    }
  },
);

export default classroomsRouter;
