import { Request, Response, NextFunction } from 'express';
import Point from '../models/Point';

/**
 * @desc Gets all stores from the database
 * @route GET /api/stores
 * @access Public
 */
export async function getStores(req: Request, res: Response, next: NextFunction) {
  console.log(req.query);
  try {
    const stores = await Point.find().select('-_id');
    return res.status(200).json({
      count: stores.length,
      success: true,
      data: stores,
    });
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
