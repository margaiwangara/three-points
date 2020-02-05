import * as mongoose from 'mongoose';
import { ISegment } from '../interfaces/IPoint';

export const segmentSchema: mongoose.Schema<ISegment> = new mongoose.Schema<ISegment>({
  _id: {
    select: false,
  },
  id: {
    type: String,
    required: [true, 'Id field is required'],
    unique: true,
  },
  weight: {
    type: Number,
    required: [true, 'Segment Weight field is required'],
  },
  mapWeight: {
    type: Number,
    required: [true, 'Segment Map Weight field is required'],
  },
});

const Segment = mongoose.model('Segment', segmentSchema, 'segments');

export default Segment;
