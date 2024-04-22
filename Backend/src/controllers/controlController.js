import adafruitService from '../services/adafruitService';
import queryService from '../services/queryService';
require('dotenv').config()

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

const serverErr1 = {
    EM: 'error from server1',
    EC: -1,
    DT: ''
}

class controlController {

    async getDeviceCondition(req, res) {
        try {
      
           const ddata = await adafruitService.getDeviceCondition(req.query.device);
            if (ddata) {
                return res.status(200).json({
                    EM: 'Get success',
                    EC: 0,
                    DT: ddata
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async postDeviceCondition(req, res) {
        try {
            const x = await adafruitService.postDeviceCondition(req.body.device,req.body.value );
            if (x) {
                return res.status(200).json({
                    EM: 'Post success',
                    EC: 0,
                    DT: x
                });
            }
        } catch (err) {

            return res.status(500).json(serverErr1);

        }
    }
    async getDeviceAppliedTh(req, res) {
        try {      
            let ddata = 0
            ddata = await queryService.getDeviceAppliedTh(req.query.device);
            
            return res.status(200).json({
                EM: 'Get success',
                EC: 0,
                DT: ddata
            });
            
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    }

    async postDeviceAppliedTh(req, res) {
        try {
            console.log(req.body.device, req.body.value)
            await queryService.saveDeviceAppliedTh(req.body.device,req.body.value );
            
            return res.status(200).json({
                EM: 'Post success',
                EC: 0,
                DT: 1
            });
            
            
        } catch (err) {

            return res.status(500).json(serverErr1);

        }
    }

};

export default new controlController();