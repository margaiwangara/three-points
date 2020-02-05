import { Request, Response, NextFunction } from 'express';
import Graph from 'node-dijkstra';
import Point from '../models/Point';

const getShortestPath = (result: any, req: any) => {
  const data = result;

  const collection: object[] | any = [];

  // map over data to get navigation.segments
  const segments: object[] | any = data.map((value: any) => value.navigation.segments);
  for (let i = 0; i < segments.length; i++) {
    // move all data to a single collection
    collection.push(...segments[i]);
  }

  // use collection with graph
  const route = new Graph();
  for (let i = 0; i < collection.length; i++) {
    // assign values to node in graph
    route.addNode(collection[i].id, { [collection[i + 1 < collection.length ? i + 1 : i].id]: collection[i].weight });
  }

  const { from, to } = req.query;
  const routeResult: object | any = route.path(from, to, { cost: true });
  const idWeightCombo = routeResult.path.map(
    (id: string, index: number) => collection[index].id === id && [id, collection[index].weight],
  );

  return {
    dist: routeResult.cost,
    route: idWeightCombo,
  };
};

/**
 * @desc Gets all stores from the database
 * @route GET /api/stores
 * @access Public
 */
export async function getStores(req: Request, res: Response, next: NextFunction) {
  try {
    // check if params exist
    const data = await Point.find();
    if (req.query.from && req.query.to) {
      return res.status(200).json({
        success: true,
        result: getShortestPath(data, req),
      });
    }
    const { advancedResults } = res as any;
    return res.status(200).json(advancedResults);
  } catch (error) {
    return next(error);
  }
}

/**
 * @desc Gets single store from the database
 * @route GET /api/stores/:id
 * @access Public
 */
export async function getStore(req: Request, res: Response, next: NextFunction) {
  try {
    const store = await Point.findOne({ id: req.params.id }).select('-_id');
    return res.status(200).json(store);
  } catch (error) {
    return next(error);
  }
}

/**
 * @desc Create a store into the database
 * @route POST /api/stores
 * @access Public
 */
export async function createStore(req: Request, res: Response, next: NextFunction) {
  try {
    const newStore = await Point.create(req.body);
    return res.status(201).json(newStore);
  } catch (error) {
    return next(error);
  }
}

/**
 * @desc Update a store
 * @route PUT /api/stores/:id
 * @access Public
 */
export async function updateStore(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedStore = await Point.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
      runValidators: false,
    });
    return res.status(200).json(updatedStore);
  } catch (error) {
    return next(error);
  }
}

/**
 * @desc Delete a store
 * @route DELETE /api/stores/:id
 * @access Public
 */
export async function deleteStore(req: Request, res: Response, next: NextFunction) {
  try {
    await Point.findOneAndDelete({ id: req.params.id });
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return next(error);
  }
}
