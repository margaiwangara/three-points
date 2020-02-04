import express, { Application, NextFunction, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { errorMiddleware } from './middleware/error';
import connectDB from './models';
import storeRoutes from './routes/stores';

// Config
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Init App
const app: Application = express();

// Init DB
connectDB();

// Routes
app.use('/api/stores', storeRoutes);

// Error Handling
app.use(function(req: Request, res: Response, next: NextFunction) {
  const error: Error = new Error();
  (error as any).status = 404;
  error.message = 'Not Found';
  next(error);
});
app.use(errorMiddleware);

// PORT
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5002;

app.listen(PORT, () => console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`));
