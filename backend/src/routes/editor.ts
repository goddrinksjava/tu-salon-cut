import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middleware/authenticateMiddleware';
import {
  deleteComment,
  getClassroomComments,
  getComment,
  setComment,
} from '../services/commentsService';
import { v4 as uuidv4 } from 'uuid';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/notices/images/');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      ['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(
        file.mimetype,
      )
    ) {
      return cb(null, true);
    }
    cb(new Error('Wrong file type'));
  },
});

const editorRouter: Router = express.Router();

editorRouter.post(
  '/imageUpload',
  authenticate({ mustBeAdmin: true }),
  upload.single('file'),
  async (req: Request, res: Response, next: NextFunction) => {
    res.json({ filename: req.file.filename, path: req.file.path });
  },
);

export default editorRouter;
