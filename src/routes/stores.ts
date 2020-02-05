import { Router } from 'express';
import { getStores, getStore, createStore, deleteStore, updateStore } from '../controllers/stores';
import advancedResults from '../middleware/advancedResults';
import Point from '../models/Point';

const router = Router();

router
  .route('/')
  .get(advancedResults(Point), getStores)
  .post(createStore);

router
  .route('/:id')
  .get(getStore)
  .put(updateStore)
  .delete(deleteStore);

export default router;
