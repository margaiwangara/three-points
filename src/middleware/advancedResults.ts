import { Request, Response, NextFunction } from 'express';
import { IPointModel } from '../interfaces/IPoint';

const advancedResults = (model: IPointModel, populate?: string | object) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // some code here
  const reqQuery: object = { ...req.query };
};

export default advancedResults;
