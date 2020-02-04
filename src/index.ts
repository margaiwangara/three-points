import express, { Application } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Config
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Init App
const app: Application = express();

// PORT
const PORT: number = parseInt(`${process.env.PORT}`, 10) || 5005;

app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
