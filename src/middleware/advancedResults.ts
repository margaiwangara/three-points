import { Request, Response, NextFunction } from 'express';
import { IPointModel } from '../interfaces/IPoint';

const advancedResults = (model: IPointModel, populate: string | object) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // some code here
};

export default advancedResults;
