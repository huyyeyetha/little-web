import db from '../models';

const geDeviceById = async (deviceId) => {
    try {
        const device = await db.Device.findOne({ where: { id: deviceId }, raw: true });
        return device;
    } catch (err) {
        console.log(err);
    }
};

const getSensorById = async (sensorId) => {
    try {
        const sensor = await db.Sensor.findOne({ where: { id: sensorId }, raw: true });
        return sensor;
    } catch (err) {
        console.log(err);
    }
};

const getLastValueWithSensor = async (sensorId) => {
    try {
        const lastValue = await db.MeasuredValue.findOne({
            attributes: { exclude: ['id'] },
            order: [['timestamp', 'DESC']],
            include: {
                model: db.Sensor,
                where: { id: sensorId },
            },
            raw: true,
            nest: true
        });
        return lastValue;
    } catch (err) {
        console.log(err);
        return;
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
        return lastValue;
    } catch (err) {
        console.log(err);
        return;
    }
};

const getLastDeviceValue = async (DeviceId) => {
    try {
        const lastValue = await db.OperationLog.findOne({
            attributes: { exclude: ['id'] },
            where: { DeviceId },
            order: [['timestamp', 'DESC']],
            raw: true,
        });
        return lastValue;
    } catch (err) {
        console.log(err);
        return serviceErr;
    }
};

const checkThreshold = async (SensorId, value) => {
    try {
        const threshold = await db.Threshold.findOne({
            attributes: { exclude: ['id'] },
            where: { SensorId },
            raw: true
        });
        const isBelowLowerBound = threshold.lowerBound ? value < threshold.lowerBound : false;
        const isAboveUpperBound = threshold.upperBound ? value > threshold.upperBound : false;
        return { isBelowLowerBound, isAboveUpperBound };
    } catch (err) {
        console.log(err);
    }
}

const saveNewestSensorValue = async (timestamp, SensorId, value, isBelowLowerBound, isAboveUpperBound) => {
    try {
        await db.MeasuredValue.create(
            { timestamp, SensorId, value, isBelowLowerBound, isAboveUpperBound }, 
            { fields: ['timestamp', 'SensorId', 'value', 'isBelowLowerBound', 'isAboveUpperBound'] }
        );
    } catch (err) {
        console.log(err);
    }
}

const saveNewestDeviceValue = async (timestamp, DeviceId, state, isAppliedThreshold, isAppliedSchedule, operatedBy) => {
    try {
        await db.OperationLog.create(
            { timestamp, DeviceId, state, isAppliedThreshold, isAppliedSchedule, operatedBy }, 
            { fields: ['timestamp', 'DeviceId', 'state', 'isAppliedThreshold', 'isAppliedSchedule', 'operatedBy'] }
        );
    } catch (err) {
        console.log(err);
    }
}

const getCurrentUser = async () => {
    try {
        const currUser = await db.User.findOne({ where: { isOnline: true }, raw: true });
        return currUser ? currUser.username : "admin"
    } catch (err) {
        console.log(err);
    }
}

// lấy coi có kích hoạt tự động bật/tắt thiết bị 
const getDeviceAppliedTh = async (id) => {
    try {
        const device = await db.Device.findOne({
            where: { id },
            raw: true
        });
        let a;
        if (device.isAppliedThreshold === null || device.isAppliedThreshold === undefined) {
            a = 0;
        } else {
            a = device.isAppliedThreshold;
        }
        
        return a;
    } catch (err) {
        console.log(err);
    }
}
// thay đổi việc kích hoạt tự động bật/tắt thiết bị 

const saveDeviceAppliedTh = async ( DeviceId, value) => {
    try {
        await db.Device.update(
            { isAppliedThreshold: value },
            { where: { id: DeviceId } }
          );
        return 1
    } catch (err) {
        console.log(err);
    }
}

module.exports = { 
    geDeviceById, getSensorById, getLastValueWithSensor, getLastSensorValue, getLastDeviceValue, 
    checkThreshold, saveNewestSensorValue, saveNewestDeviceValue, getCurrentUser,
    getDeviceAppliedTh, saveDeviceAppliedTh
};