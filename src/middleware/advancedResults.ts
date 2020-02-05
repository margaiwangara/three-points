import { Request, Response, NextFunction } from 'express';
import { IPointModel } from '../interfaces/IPoint';

const getResults = (model: any, req: any) => {
  // duplicate req.query
  let query;
  const reqQuery: object | any = { ...req.query };
  const removeFields: string[] = ['filter', 'sort', 'select', 'page', 'limit'];

  // delete blacklisted from query
  removeFields.forEach(field => delete reqQuery[field]);

  let queryString: string = JSON.stringify(reqQuery);

  // replace gt|lt|in
  queryString = queryString.replace(/\b(gt|lt|in|gte|lte)\b/g, item => `$${item}`);

  // run query
  query = model.find(JSON.parse(queryString));

  // select query
  if (req.query.select) {
    const fields: string = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // sort query
  if (req.query.sort) {
    const sortBy: string = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-title');
  }

  return query;
};

const advancedResults = (model: any, populate?: string | object) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page: number = parseInt(req.query.page, 10) || 1;
    const limit: number = parseInt(req.query.limit, 10) || 10;
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;
    const total = await model.countDocuments();

    let query = getResults(model, req);
    // pagination query
    query = query.skip(startIndex).limit(limit);

    // if populate exists
    if (populate) {
      query = query.populate(populate);
    }

    // get final results
    const results = await query;

    // pagination links
    const pagination: object | any = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.previous = {
        page: page - 1,
        limit,
      };
    }

    (res as any).advancedResults = {
      success: true,
      count: results.length,
      pagination,
      data: results,
    };
    return next();
  } catch (error) {
    return next(error);
  }
};

export default advancedResults;
