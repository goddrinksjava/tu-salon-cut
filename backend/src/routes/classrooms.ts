import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { getComplaints, setComplaints } from '../services/complaintsService';
const classroomsRouter: Router = express.Router();

classroomsRouter.post(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const classroomIdStr = req.params.id;

    try {
      const classroomId = parseInt(classroomIdStr);
      setComplaints(
        req.session.user.id,
        classroomId,
        req.body.classroomProblemsId,
      );
    } catch (err) {
      next(err);
    }
  },
);

classroomsRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const classroomIdStr = req.params.id;

    try {
      const classroomId = parseInt(classroomIdStr);
      const complaints = await getComplaints(classroomId);
      console.log(complaints);
      res.json(complaints);
    } catch (err) {
      next(err);
    }
  },
);

export default classroomsRouter;
