import { join } from 'path';
import express, { json, urlencoded } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import { ENV } from '~/common/enums/enums';
import { initApi } from '~/api/api';
import { logger } from '~/services/services';
import {
  setTraceId as setTraceIdMiddleware,
  logRequest as logRequestMiddleware,
  handleError as handleErrorMiddleware,
} from '~/middlewares/middlewares';
import knexConfig from '../knexfile';

const app = express();

Model.knex(Knex(knexConfig[ENV.APP.NODE_ENV]));

app.use(setTraceIdMiddleware);
app.use(logRequestMiddleware);
app.use(json({ limit: '100mb' }));
app.use(urlencoded({ extended: true, limit: '100mb' }));

initApi(app);

app.use(express.static(join(__dirname, '../public')));
app.use('*', (_req, res) => {
  return res.sendFile(join(__dirname, '../public', 'index.html'));
});

app.use(handleErrorMiddleware);

const server = app.listen(ENV.APP.SERVER_PORT, () => {
  logger.log(
    `Listening to connections on Port — ${ENV.APP.SERVER_PORT}, Environment: ${ENV.APP.NODE_ENV}`,
  );
});

export { server };
