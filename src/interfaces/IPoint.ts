import { Document } from 'mongoose';

export interface IPoint {
  title: string;
  description: string;
  filters: IFilter;
  location: ILocation;
  navigation: ISegments;
  properties: IProperty;
}

export interface IPointModel extends IPoint, Document {
  id: string;
  dateCreated: Date;
}

export type IFilter = {
  pointType: string[];
};

export type ILocation = {
  type: string;
  geometry: IGeometry;
  properties: ILocationProperty;
};

export type IGeometry = {
  type: string;
  coordinates: number[];
};

export type ILocationProperty = {
  floorLevel: number;
  shopCenterPoint: number[];
};

export type ISegments = {
  segments: ISegment[];
};

export type ISegment = {
  id: string;
  weight: number;
  mapWeight: number;
};

export type IProperty = {
  isVisibleOnList: boolean;
};
