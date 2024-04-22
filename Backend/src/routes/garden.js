import express from 'express';
const router = express.Router();

import gardenController from '../controllers/gardenController';

router.get('/', gardenController.getAllGarden);

export default router;
