import * as mongoose from 'mongoose';
import { IPointModel } from '../interfaces/IPoint';
import { segmentSchema } from './Segment';

const pointSchema: mongoose.Schema<IPointModel> = new mongoose.Schema<IPointModel>({
  id: {
    type: String,
    required: [true, 'Id field is required'],
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Title field is required'],
    trim: true,
    maxlength: [100, 'Max title length is 100 chars'],
  },
  description: {
    type: String,
    required: [true, 'Description field is required'],
    trim: true,
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
    },
    properties: {
      floorLevel: Number,
      shopCenterPoint: [Number],
    },
  },
  navigation: {
    segments: [segmentSchema],
  },
  properties: {
    isVisibleOnList: {
      type: Boolean,
      default: false,
    },
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Point: mongoose.Model<IPointModel> = mongoose.model<IPointModel>('Point', pointSchema, 'points');

export default Point;
