import bodyParser from 'body-parser';
import express from 'express';
import { tasksRouter } from './api/tasks.router';

const app = express();

app.use(bodyParser.json());
app.use('/', tasksRouter);

export { app };
