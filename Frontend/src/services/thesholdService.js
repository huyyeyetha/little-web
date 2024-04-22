import { webAxios } from '../utils/axios';

// get threshold values of garden with 'gardenId'
// [get] /threshold/value/:gardenId
// input: gardenId
// return: null if gardenId invalid
const getThresholdByGardenId = async (gardenId) => {
    const isInteger = Number.isInteger(parseInt(gardenId));

    if (!isInteger) {
        console.error('Invalid gardenId');
        return null;
    }

    return await webAxios.get(`/setting/threshold/value/${gardenId}`);
};

// update light intensive threshold of garden with 'gardenId'
//[post] /update/:sensorId/:gardenId . post a object {newUpper, newLower}
// input: gardenId, newUpper, newLower
// return: null if gardenId invalid
const updateThresholdOfGarden = async (gardenId, sensorId, newUpper, newLower) => {
    const isInteger = Number.isInteger(parseInt(gardenId));

    if (!isInteger) {
        console.error('Invalid gardenId');
        return null;
    }

    return await webAxios.post(`/setting/threshold/update/${sensorId}/${gardenId}`, { newUpper, newLower });
};

export { getThresholdByGardenId, updateThresholdOfGarden };
