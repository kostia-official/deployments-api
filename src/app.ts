import express from 'express';
import cors from 'cors';
import * as db from './database';
import deployments from './controllers/deployments';
import templates from './controllers/templates';

const app = express();
db.connect();

app.use(cors());
app.use(express.json());
app.use('/deployments', deployments);
app.use('/templates', templates);

export default app;
