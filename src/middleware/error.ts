import { Response, Request, NextFunction } from 'express';
import ErrorResponse from '../handlers/ErrorResponse';

export const errorMiddleware = function(
  error: ErrorResponse,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return response.status(error.status || 500).json({
    error: {
      message: error.message || 'Oops! Something Went Wrong',
    },
  });
};
