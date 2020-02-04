import { Response, Request, NextFunction } from 'express';
import ErrorResponse from '../handlers/ErrorResponse';

export const errorMiddleware = function(
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  return res.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something Went Wrong',
    },
  });
};
