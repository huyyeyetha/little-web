import userService from '../services/userService';

const serverErr = {
    EM: 'error from server',
    EC: 2,
    DT: ''
};

class userController {
    
    async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            if (username && password) {
                const data = await userService.login(req.body.username, req.body.password);
                return res.status(200).json({
                    EM: data.EM,
                    EC: data.EC,
                    DT: data.DT
                });
            } else {
                return res.json({
                    EM: "Username and password are required !",
                    EC: 1,
                    DT: ''
                });
            }
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    };

    async logout(req, res) {
        try {
            const data = await userService.logout();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } catch (err) {
            return res.status(500).json(serverErr);
        }
    };
};

export default new userController();