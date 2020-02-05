import express, { Application, NextFunction, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import cors from 'cors';
import { errorMiddleware } from './middleware/error';
import connectDB from './models';
import storeRoutes from './routes/stores';
// import { pointModelSeeder } from './utils/seeder';

// Config
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Init App
const app: Application = express();

const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

// Middleware
app.use(express.json());
app.use(mongoSanitize());
app.use(helmet());
app.use(rateLimiter);
app.use(hpp());
app.use(cors());

// Init DB
connectDB();

// seed DB
// pointModelSeeder();

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
