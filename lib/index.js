import express from 'express';
import { fileURLToPath } from 'url';
import { flaschenpost } from 'flaschenpost';
import { getPrivateRoute } from './routes/getPrivateRoute';
import { getRootRoute } from './routes/getRootRoute';
import http from 'http';
import path from 'path';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const logger = flaschenpost.getLogger();

(async () => {
  const htmlRoot = path.join(rootDirectory, 'html');

  const app = express();

  app.get(
    '/private',
    getPrivateRoute({ htmlRoot })
  );
  app.get(
    '/',
    getRootRoute({ htmlRoot })
  );

  const server = http.createServer(app);

  server.listen(8_080, () => {
    logger.info('Server is running.');
  });
})();
