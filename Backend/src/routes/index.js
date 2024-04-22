import userRouter from './user';
import gardenRouter from './garden';
import sensorRouter from './sensor';
import settingRouter from './setting';
import controlRouter from './control';

const routes = (app) => {
    app.use('/user', userRouter);
    app.use('/garden', gardenRouter);
    app.use('/sensor', sensorRouter);
    app.use('/setting', settingRouter);
    app.use('/control', controlRouter)
}

export default routes;