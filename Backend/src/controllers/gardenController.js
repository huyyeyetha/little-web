import webService from '../services/webService';

const serverErr = {
    EM: 'error from server',
    EC: -1,
    DT: ''
}

class gardenController {
    async getAllGarden(req, res) {
        try {
            const data = await webService.getAllGarden();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        } catch (err) {
            return res.status(500).json(serverErr)
        }
    }
};

export default new gardenController();