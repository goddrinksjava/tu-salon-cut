import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middleware/authenticateMiddleware';
import {
  getClassroomComments,
  getComment,
  setComment,
} from '../services/commentsService';
const commentsRouter: Router = express.Router();

commentsRouter.get(
  '/all/:classroomId',
  authenticate({ mustBeAdmin: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    const { classroomId } = req.params;

    try {
      const comments = await getClassroomComments(classroomId);
      res.json({ comments });
    } catch (err) {
      next(err);
    }
  },
);

commentsRouter.post(
  '/:classroomId',
  authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { classroomId } = req.params;
    const { comment } = req.body;

    try {
      await setComment(req.user.id, classroomId, comment);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },
);

commentsRouter.get(
  '/:classroomId',
  authenticate(),
  async (req: Request, res: Response, next: NextFunction) => {
    const { classroomId } = req.params;

    try {
      const comment = await getComment(req.user.id, classroomId);
      res.json({ comment });
    } catch (err) {
      next(err);
    }
  },
);

export default commentsRouter;
