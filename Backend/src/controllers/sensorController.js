import webService from '../services/webService';
require('dotenv').config()

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class sensorController {

    async getAllSensor(req, res) {
        try {
            const allSensor = await webService.getAllSensor(req.query.gardenId);
            if (allSensor) {
                return res.status(200).json({
                    EM: allSensor.EM,
                    EC: allSensor.EC,
                    DT: allSensor.DT
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async getSensorInfo(req, res) {
        try {
            const lastValue = await webService.getSensorInfo(req.params.sensorId);
            if (lastValue) {
                return res.status(200).json({
                    EM: lastValue.EM,
                    EC: lastValue.EC,
                    DT: lastValue.DT
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async getLastValueWithSensor(req, res) {
        try {
            const raw = await webService.getLastValueWithSensor(req.params.sensorId);
            let lastValue = raw;
            if (raw && raw.EC === 0) {
                lastValue.DT = { time: raw.DT.timestamp.toLocaleString(), value: raw.DT.value, unit: raw.DT.Sensor.unit };
            }
            return res.status(200).json({
                EM: lastValue.EM,
                EC: lastValue.EC,
                DT: lastValue.DT
            });
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async sendLastValue(req, res) {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            
            const lastValue = await webService.getLastSensorValue(req.params.sensorId);
            let prev;
            if (lastValue.EC === 0){
                res.write(`data: ${JSON.stringify(lastValue.DT)}\n\n`);
                prev = lastValue.DT.timestamp;
            }
            const timerId = setInterval(async () => {
                const lastValue = await webService.getLastSensorValue(req.params.sensorId);
                if (lastValue.EC === 0) {
                    if (lastValue.DT.timestamp > prev) {
                        res.write(`data: ${JSON.stringify(lastValue.DT)}\n\n`);
                        prev = lastValue.DT.timestamp;
                    }
                }
            }, process.env.TIME_INTERVAL);

            req.on('close', () => clearInterval(timerId));
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async sendDataChart(req, res) {
        try {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'
            });
            
            const rawData = await webService.getDataChart(req.params.sensorId, +req.query.limit);
            let prevTimestamp;
            if (rawData && rawData.EC === 0){
                res.write(`data: ${JSON.stringify(rawData.DT)}\n\n`);
                prevTimestamp = rawData.DT.time.findLast((t) => t);
            }
            const timerId = setInterval(async () => {
                const lastValue = await webService.getLastSensorValue(req.params.sensorId);
                if (lastValue && lastValue.EC === 0) {
                    if (!prevTimestamp || lastValue.DT.timestamp > prevTimestamp) {
                        const rawData = await webService.getDataChart(req.params.sensorId, +req.query.limit);
                        if (rawData && rawData.EC === 0) {
                            res.write(`data: ${JSON.stringify(rawData.DT)}\n\n`);
                            prevTimestamp = rawData.DT.time.findLast((t) => t !== '');
                        }
                    }
                }
            }, process.env.TIME_INTERVAL);

            req.on('close', () => clearInterval(timerId));
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async getPageData(req, res) {
        try {
            const sensorId = req.params.sensorId;
            const { page, limit, from, to } = req.query;
            let start = from !== '' ? new Date(new Date(from).toLocaleString("en-US", {timeZone: "GMT"})) : null;
            let end = to !== '' ? new Date(new Date(to).toLocaleString("en-US", {timeZone: "GMT"})) : null;
            if (start && end) {
                if (start >= end) {
                    return res.json({
                        EM: "Ngày bắt đầu phải trước ngày kết thúc !",
                        EC: -1,
                        DT: [] 
                    });
                }
            }
            const pageData = await webService.getPageData(sensorId, +page, +limit, start, end);
            if (pageData) {
                return res.status(200).json({
                    EM: pageData.EM,
                    EC: pageData.EC,
                    DT: pageData.DT 
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }
};

export default new sensorController();