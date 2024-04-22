import express from 'express';
import cors from 'cors';
import routes from './routes';
import connectDb from './config/connectDb';
import { updateData } from './services/adafruitService';

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectDb();

updateData();

routes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
