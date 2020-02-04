import * as mongoose from 'mongoose';
import { IPointModel } from '../interfaces/IPoint';

const pointSchema: mongoose.Schema<IPointModel> = new mongoose.Schema<IPointModel>({
  title: {
    type: String,
    required: [true, 'Title field is required'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
  },
  filters: {
    pointType: [String],
  },
});
