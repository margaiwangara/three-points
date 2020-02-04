import * as mongoose from 'mongoose';
import { IPointModel } from '../interfaces/IPoint';
import { segmentSchema } from './Segment';

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
  location: {
    type: {
      type: String,
      required: [true, 'Location Type field is required'],
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      properties: {
        floorLevel: Number,
        shopCenterPoint: [Number],
      },
    },
  },
  navigation: {
    segments: [segmentSchema],
  },
  properties: {
    isVisibleOnList: {
      type: Boolean,
      required: [true, 'Properties Visibility field is required'],
    },
  },
});

const Point: mongoose.Model<IPointModel> = mongoose.model<IPointModel>('Point', pointSchema, 'points');

export default Point;
