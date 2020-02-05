import express, { Application, NextFunction, Response, Request } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import Graph from 'node-dijkstra';
import { errorMiddleware } from './middleware/error';
import connectDB from './models';
import storeRoutes from './routes/stores';
// import { pointModelSeeder } from './utils/seeder';

// Config
dotenv.config({ path: path.resolve(__dirname, '../config/config.env') });

// Init App
const app: Application = express();

// Init DB
connectDB();

// seed DB
// pointModelSeeder();
const data: string = `[
  {
    "id": "dd91c645-1301-447d-baf9-40de4649d57a",
    "weight": 13.5,
    "mapWeight": 21.774193548387096
  },
  {
    "id": "0867185c-2eb7-4a76-8596-c14f74a4acb1",
    "weight": 8.5,
    "mapWeight": 13.709677419354838
  },
  {
    "id": "d20bd53e-361e-48fb-944f-dcdbf3e8defd",
    "weight": 18.5,
    "mapWeight": 29.838709677419356
  }
]`;

const parsedData: object[] | any = JSON.parse(data);
const route = new Graph();
for (let i = 0; i < parsedData.length; i++) {
  route.addNode(parsedData[i].id, { [parsedData[i + 1 < parsedData.length ? i + 1 : i].id]: parsedData[i].weight });
}

const from: string = 'dd91c645-1301-447d-baf9-40de4649d57a';
const to: string = 'd20bd53e-361e-48fb-944f-dcdbf3e8defd';

console.log(route.path(from, to, { cost: true }));

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
