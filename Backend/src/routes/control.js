import express from 'express';
const router = express.Router();

import controlController from '../controllers/controlController';

router.get('/device/data', controlController.getDeviceCondition);
router.post('/device', controlController.postDeviceCondition);

router.get('/appliedTh/data', controlController.getDeviceAppliedTh);
router.post('/appliedTh', controlController.postDeviceAppliedTh);

export default router;