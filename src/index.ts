import express, { Application, NextFunction, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { errorMiddleware } from './middleware/error';

// Config
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Init App
const app: Application = express();

// Error Handling
app.use(errorMiddleware);
app.use(function(req: Request, res: Response, next: NextFunction) {
  const error: Error = new Error();
  (error as any).status = 404;
  error.message = 'Not Found';
  next(error);
});

// PORT
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5005;

app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
