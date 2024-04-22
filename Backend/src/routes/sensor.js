import express from 'express';
const router = express.Router();

import sensorController from '../controllers/sensorController';

router.get('/info', sensorController.getAllSensor);
router.get('/info/:sensorId', sensorController.getSensorInfo);
router.get('/data/chart/:sensorId', sensorController.sendDataChart);
router.get('/data/page/:sensorId', sensorController.getPageData);
router.get('/data/last/:sensorId', sensorController.sendLastValue);
router.get('/data/new/:sensorId', sensorController.getLastValueWithSensor);

export default router;
