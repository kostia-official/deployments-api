import { Request, Response, NextFunction } from 'express';
import { Schema } from '@hapi/joi';

export const validate = (schema: Schema, property: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const toValidate = req[property];
  const { error } = schema.validate(toValidate);

  if (!error) return next();

  res.status(400).json({ error: error.message });
};
