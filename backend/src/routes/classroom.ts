import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middleware/authenticateMiddleware';
import {
  getComplaintsWithCheckedByUser,
  setComplaints,
} from '../services/complaintsService';
const classroomRouter: Router = express.Router();

classroomRouter.post(
  '/:id',
  authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    const classroomIdStr = req.params.id;

    try {
      const classroomId = parseInt(classroomIdStr);
      setComplaints(req.user.id, classroomId, req.body.classroomProblemsId);
    } catch (err) {
      next(err);
    }
  },
);

classroomRouter.get(
  '/1',
  authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('yo');
    const classroomIdStr = '1';

    try {
      const classroomId = parseInt(classroomIdStr);
      const complaints = await getComplaintsWithCheckedByUser(
        classroomId,
        req.user.id,
      );
      console.log(complaints);
      res.json(complaints);
    } catch (err) {
      next(err);
    }
  },
);

export default classroomRouter;
