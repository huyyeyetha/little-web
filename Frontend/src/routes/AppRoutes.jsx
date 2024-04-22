import { Navigate } from 'react-router-dom';

import WrapPrivate from './WrapPrivate';
import DefaultLayout from '../layout/DefaultLayout';
import Data from '../pages/Data/Data';
import SensorData from '../pages/Data/SensorData/SensorData';
import Control from '../pages/Control/Control';
import Statistic from '../pages/Statistic/Statistic';
import Setting from '../pages/Setting/Setting';
// import ThresholdSetting from '../pages/Setting/ThresholdSetting/ThresholdSetting';
import SetGardenThreshold from '../pages/Setting/ThresholdSetting/SetGardenThreshold';
import Login from '../pages/LoginRegister/Login';
import Register from '../pages/LoginRegister/Register';
import GardenNav from '../layout/GardenNav/GardenNav';

const privateRoutes = [
    {
        path: '/data',
        component: () => <WrapPrivate children={<GardenNav children={<Data />} />} />,
        layout: DefaultLayout,
        title: 'GIÁM SÁT MÔI TRƯỜNG',
    },
    {
        path: '/data/:sensorId',
        component: () => <WrapPrivate children={<SensorData />} />,
        layout: DefaultLayout,
    },
    {
        path: '/control',
        component: () => <WrapPrivate children={<GardenNav children={<Control />} />} />,
        layout: DefaultLayout,
        title: 'ĐIỀU KHIỂN THIẾT BỊ',
    },
    {
        path: '/statistic',
        component: () => <WrapPrivate children={<GardenNav children={<Statistic />} />} />,
        layout: DefaultLayout,
        title: 'THỐNG KÊ',
    },
    {
        path: '/setting',
        component: () => <WrapPrivate children={<Setting />} />,
        layout: DefaultLayout,
        title: 'CÀI ĐẶT',
    },
    {
        path: 'setting/threshold-setting',
        component: () => <WrapPrivate children={<GardenNav children={<SetGardenThreshold />} />} />,
        layout: DefaultLayout,
    },
    {
        path: 'setting/account-settings',
        component: () => <WrapPrivate children={<ThresholdSetting />} />,
        layout: DefaultLayout,
    },
];

const publicRoutes = [
    { path: '/', component: () => <Navigate to="/login" /> },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
];

export { privateRoutes, publicRoutes };
