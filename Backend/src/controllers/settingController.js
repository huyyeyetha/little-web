import webService from '../services/webService';
require('dotenv').config()

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class settingController {
    //[Get] /value/:gardenId
    async getThresholdValueByGardenId(req, res) {

        const gardenId = parseInt(req.params.gardenId);

        if (!Number.isInteger(gardenId)) {
            return res.status(400).json({ error: 'Invalid gardenId' });
        }

        try {
            const data = await webService.getThresholdValueByGardenId(gardenId);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (error) {
            return res.status(500).json(serverErr)
        }
    }


    //[post] /update/:sensorId/:sensorId/:gardenId . post a object {upperValue, lowerValue}
    async updateThresholdOfGarden(req, res) {

        const gardenId = parseInt(req.params.gardenId);
        const sensorId = req.params.sensorId;
        const existSensorId = ['nhietdo', 'doamdat', 'doamkk', 'anhsang']
        if (!existSensorId.includes(sensorId)) {
            return res.status(444).json({ message: `Can't update because sensorIdError` });
        }
        if (!Number.isInteger(gardenId)) {
            return res.status(400).json({ error: 'Invalid gardenId' });
        }

        const newUpper = typeof req.body.newUpper !== 'undefined' ? req.body.newUpper : null;
        const newLower = typeof req.body.newLower !== 'undefined' ? req.body.newLower : null;

        if (newUpper == null && newLower == null) {
            return res.status(444).json({ message: `Can't update because newUpper and newLower is null` });
        }

        try {
            const response = await webService.updateThresholdOfGarden(gardenId, sensorId, newUpper, newLower);
            if (response.EC == 0) {
                if (response.DT != 0) {
                    return res.status(200).json({ message: `Threshold updated successfully: ${response.EM}` });
                } else {
                    return res.status(200).json({ message: "No have record to update" });
                }
            } else {
                return res.status(444).json({ message: `Has some error. ${response.EM}` });
            }

        } catch (error) {
            return res.status(500).json(serverErr);
        }
    }

    async sendNotification(req, res) {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            const sensorId = req.query.sensorId;
            const deviceId = req.query.deviceId;
            let prevTimestamp;
            const sendData = await webService.getLastOutThreshold(sensorId, deviceId);
            if (sendData && sendData.EC === 0) {
                res.write(`data: ${JSON.stringify(sendData)}\n\n`);
                prevTimestamp = sendData.DT.timestamp;
            }

            const timerId = setInterval(async () => {
                const sendData = await webService.getLastOutThreshold(sensorId, deviceId);
                if (sendData && sendData.EC === 0) {
                    if (!prevTimestamp || sendData.DT.timestamp > prevTimestamp) {
                        res.write(`data: ${JSON.stringify(sendData)}\n\n`);
                        prevTimestamp = sendData.DT.timestamp;
                    }
                }
            }, process.env.TIME_INTERVAL);

            req.on('close', () => clearInterval(timerId));
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }
};

export default new settingController();
