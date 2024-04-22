import adafruitService from './adafruitService';
import db from '../models';
import bcrypt from 'bcryptjs';
const User = db.User;
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()

const serviceErr = { 
    EM: 'Error from service',
    EC: -2,
    DT: ''
}

const hashPassword = (password) =>{
    return bcrypt.hashSync(password, salt);
};

const login = async (username, userpass) => {
    try {
        const userinfo = await User.findOne({ where: { username }, raw: true });
        if (userinfo) {
            const check = bcrypt.compareSync(userpass, userinfo.password);
            if (check) {
                await User.update({ isOnline: true }, { where: { username } });
                return {
                    EM: 'Login succeed',
                    EC: 0,
                    DT: ''
                };
            }
        }
        return {
            EM: 'Wrong username or password !',
            EC: -1,
            DT: ''
        };
    } catch (err){
        console.log(err);
        return serviceErr;
    }
};

const logout = async () => {
    try {
        await User.update({ isOnline: false }, { where: { isOnline: true } });
        return {
            EM: 'Logout succeed',
            EC: 0,
            DT: ''
        };
    } catch (err){
        console.log(err);
        return serviceErr
    }
}


module.exports = { login, logout };