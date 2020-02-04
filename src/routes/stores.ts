import { Router } from 'express';
import { getStores, getStore, createStore, deleteStore, updateStore } from '../controllers/stores';

const router = Router();

router
  .route('/')
  .get(getStores)
  .post(createStore);

router
  .route('/:id')
  .get(getStore)
  .put(updateStore)
  .delete(deleteStore);

export default router;
