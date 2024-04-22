import express from 'express';
const router = express.Router();

import settingController from '../controllers/settingController';

//[Get] /value/:gardenId
router.get('/threshold/value/:gardenId', settingController.getThresholdValueByGardenId);

//[post] /update/light-intensive/:gardenId . post a object {upperValue, lowerValue}
router.post('/threshold/update/:sensorId/:gardenId', settingController.updateThresholdOfGarden);

router.get('/notification', settingController.sendNotification);

export default router;

