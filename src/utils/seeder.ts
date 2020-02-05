import Point from '../models/Point';
import * as path from 'path';
import * as fs from 'fs';

export const pointModelSeeder = async () => {
  // get data from json
  const points = fs.readFileSync(path.resolve(__dirname, '../../data/points.json'), 'utf-8');
  try {
    const newPoint = await Point.create(JSON.parse(points));
    console.log(newPoint);
  } catch (error) {
    console.log(error);
  }
};
