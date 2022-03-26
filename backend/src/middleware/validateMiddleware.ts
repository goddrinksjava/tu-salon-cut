import { NextFunction, Request, Response } from 'express';
import { AnySchema, ValidationError } from 'yup';

const validateBody =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      return next();
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.sendStatus(403);
      }
      return res.sendStatus(500);
    }
  };

export default validateBody;
