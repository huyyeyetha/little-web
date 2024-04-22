import db from '../models';
const Op = db.Sequelize.Op;
import queryService from './queryService';

const serviceErr = {
    EM: 'Error from service',
    EC: -2,
    DT: ''
};

const getAllGarden = async () => {
    try {
        const allGarden = await db.Garden.findAll();
        if (allGarden) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: allGarden
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getLastValueWithSensor = async (sensorId) => {
    try {
        const lastValue = await queryService.getLastValueWithSensor(sensorId);
        if (lastValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: lastValue
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getAllSensor = async (GardenId) => {
    try {
        const allSensor = await db.Sensor.findAll({ where: { GardenId }, raw: true });
        if (allSensor) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: allSensor
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getSensorInfo = async (sensorId) => {
    try {
        const sensor = await db.Sensor.findOne({ where: { id: sensorId }, raw: true });
        if (sensor) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: sensor
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr
    }
};

const getDataChart = async (SensorId, limit) => {
    try {
        const data = await db.MeasuredValue.findAll({
            where: { SensorId },
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            limit: limit, raw: true
        });
        if (data) {
            let dataChart = {time: [], value: []};
            for (let i = 0; i < limit; i++) {
                let time = null;
                let value = null;
                if (i < data.length){
                    time = data[data.length - i - 1].timestamp;
                    value = data[data.length - i - 1].value;
                }
                dataChart.time.push(time);
                dataChart.value.push(value);
            }
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: dataChart
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getPageData = async (SensorId, page, limit, start, end) => {
    try {
        let whereCondition;
        if (start && end) whereCondition = { SensorId, timestamp: { [Op.between]: [start, end] }}
        else if (start) whereCondition = { SensorId, timestamp: { [Op.gte]: start }}
        else if (end) whereCondition = { SensorId, timestamp: { [Op.lt]: end }}
        else whereCondition = { SensorId }
    
        const offset = (page - 1)*limit;
        let { count, rows } = await db.MeasuredValue.findAndCountAll({
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            where: whereCondition,
            offset, limit, 
            raw: true
        });
        if (rows) {
            const data = rows.map((row) => ({time: row.timestamp.toLocaleString(), value: row.value }));
            const pageData = { numRow: count, numPage: Math.ceil(count/limit), data };
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: pageData
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const getLastSensorValue = async (SensorId) => {
    try {
        const lastValue = await db.MeasuredValue.findOne({
            attributes: { exclude: ['id'] },
            where: { SensorId },
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        if (lastValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: lastValue
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

// Threshold value
// return: {message, code, data: thresholdData}
const getThresholdValueByGardenId = async (GardenId) => {
    try {
        const thresholdValue = await db.Threshold.findAll({
            attributes: { exclude: ['id'] }, 
            where: { GardenId }, 
            raw: true 
        });
        if (thresholdValue) {
            return {
                EM: 'Get succeed',
                EC: 0,
                DT: thresholdValue
            };
        }
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

// in: GardenId, SensorId, upperValue, lowerValue
// update threshold value with SensorIdId
// return: {message, code, data: rowAffected}
// SensorId: nhietdo, doamdat, doamkk, anhsang
const updateThresholdOfGarden = async (GardenId, SensorId, newUpper, newLower) => {
    const existSensorId = ['nhietdo', 'doamdat', 'doamkk', 'anhsang']
    if (!existSensorId.includes(SensorId)){
        console.log('not find SensorIdId');
        return {
            EM: 'Error: not find SensorIdId',
            EC: -2,
            DT: ''
        };
    }
    try {
        let updatedUpper = null;
        let updatedLower = null;
        if (newUpper != null){
            updatedUpper = await db.Threshold.update({ value: newUpper }, { where: { GardenId: GardenId, SensorId: SensorId, isUpperBound: true } });
        }
        if (newLower != null){
            updatedLower = await db.Threshold.update({ value: newLower }, { where: { GardenId: GardenId, SensorId: SensorId, isUpperBound: false } });
        }

        if (updatedUpper == null && updatedLower == null) {
            return {
                EM: 'don\'t have updated: both newUpper is null and newLower is null',
                EC: -2,
                DT: 0
            };
        } else if (updatedLower == null) {
            return {
                EM: 'Upperbound has been Updated. newLower is null',
                EC: 0,
                DT: updatedUpper[0]
            };
        } else if (updatedUpper == null) {
            return {
                EM: 'Lowerbound has been Updated. newUpper is null',
                EC: 0,
                DT: updatedLower[0]
            };
        } else {
            return {
                EM: 'update succeed: both Lowerbound and Upperbound has been Updated',
                EC: 0,
                DT: updatedUpper[0] + updatedLower[0]
            };
        }

    } catch (err) {
        console.log(err);
        return serviceErr;
    }
}

const getLastOutThreshold = async (sensorId, deviceId) => {
    try {
        const deviceData = await queryService.geDeviceById(deviceId);
        if (deviceData && !deviceData?.isApplyThreshold) {
            const rawLastValue = await getLastValueWithSensor(sensorId);
            if (rawLastValue && rawLastValue.EC === 0) {
                if (rawLastValue.DT.isBelowLowerBound || rawLastValue.DT.isAboveUpperBound) {
                    return { 
                        EM: "Last value is out threshold", 
                        EC: 0, 
                        DT: {
                            timestamp: rawLastValue.DT.timestamp,
                            value: rawLastValue.DT.value,
                            isBelowLowerBound: rawLastValue.DT.isBelowLowerBound,
                            isAboveUpperBound: rawLastValue.DT.isAboveUpperBound,
                            unit: rawLastValue.DT.Sensor.unit
                        }
                    };
                }
            }
        }
        return { EM: "Last value not out threshold", EC: 1, DT: { isBelowLowerBound: false, isAboveUpperBound: false }};
    } catch (err) {
        return serviceErr;
    }
};

module.exports = { 
    getAllGarden, getLastValueWithSensor, getAllSensor, 
    getSensorInfo, getDataChart, getPageData, getLastSensorValue,
    getThresholdValueByGardenId, updateThresholdOfGarden,  
    getLastOutThreshold
};

