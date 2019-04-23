import 'dotenv/config';
import { app } from './app';
import { config } from './config';
import { createLogger } from './debug';

const debug = createLogger('express');

app.listen(config.listen.port, config.listen.address, () => {
  debug(`App is running at http://${config.listen.address}:${config.listen.port}`);
});
