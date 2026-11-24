import { Router } from 'express';
import {
  getAllGigs,
  getGigById,
  createGig,
  updateGig,
  deleteGig
} from '../controllers/gigController.js';

const router = Router();

router.get('/', getAllGigs);
router.get('/:id', getGigById);
router.post('/', createGig);
router.put('/:id', updateGig);
router.delete('/:id', deleteGig);

export default router;
