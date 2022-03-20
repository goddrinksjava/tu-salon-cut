import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middleware/authenticateMiddleware';
import {
  classroomExists,
  getComplaintsWithCheckedByUser,
  setComplaints,
} from '../services/complaintsService';
const classroomRouter: Router = express.Router();

classroomRouter.post(
  '/:name',
  authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    const classroomName = req.params.name;

    try {
      await setComplaints(
        req.user.id,
        classroomName,
        req.body.classroomProblemsId,
      );

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
);

classroomRouter.get(
  '/:name',
  authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    const classroomName = req.params.name;

    try {
      const existsPromise = classroomExists(classroomName);
      const complaintsPromise = getComplaintsWithCheckedByUser(
        classroomName,
        req.user.id,
      );

      const [exists, complaints] = await Promise.all([
        existsPromise,
        complaintsPromise,
      ]);

      console.log(exists);

      if (!exists) {
        res.sendStatus(404);
      }

      console.log(complaints);
      res.json(complaints);
    } catch (err) {
      next(err);
    }
  },
);

export default classroomRouter;
