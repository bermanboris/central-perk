import bodyParser from 'body-parser';
import 'dotenv/config';
import express from 'express';
import { tasksRouter } from './api/tasks.router';
import { config } from './config';
import { createLogger } from './debug';

const app = express();
const debug = createLogger('express');

app.use(bodyParser.json());

app.use('/tasks', tasksRouter);

app.listen(config.listen.port, config.listen.address, () => {
  debug(`App is running at http://${config.listen.address}:${config.listen.port}`);
});

export { app };
