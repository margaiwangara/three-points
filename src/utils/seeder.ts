import Point from '../models/Point';
import * as path from 'path';
import * as fs from 'fs';

export const pointModelSeeder = async () => {
  // get data from json
  const points = fs.readFileSync(path.resolve(__dirname, '../../data/points.json'), 'utf-8');
  try {
    // delete all docs
    await Point.deleteMany({});
    const parsedPoints = JSON.parse(points);
    const newPoint = await Point.create(parsedPoints);
    console.log(newPoint);
  } catch (error) {
    console.log(error);
  }
};
