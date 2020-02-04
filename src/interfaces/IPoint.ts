import { Document } from 'mongoose';

export interface IPoint {
  title: string;
  description: string;
  filters: IFilter;
  location: ILocation;
  navigation: ISegment;
  properties: IProperty;
}

export interface IPointModel extends IPoint, Document {
  id: string;
  dateCreated: Date;
}

type IFilter = {
  pointType: string[];
};

type ILocation = {
  type: string;
  geometry: IGeometry;
  properties: ILocationProperty;
};

type IGeometry = {
  type: string;
  coordinates: number[];
};

type ILocationProperty = {
  floorLevel: number;
  shopCenterPoint: number[];
};

type ISegment = {
  segments: ISingleSegment[];
};

type ISingleSegment = {
  id: string;
  weight: number;
  mapWeight: number;
};

type IProperty = {
  isVisibleOnList: boolean;
};
