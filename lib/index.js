import express from 'express';
import { fileURLToPath } from 'url';
import { flaschenpost } from 'flaschenpost';
import { getPrivateRoute } from './routes/getPrivateRoute';
import { getRootRoute } from './routes/getRootRoute';
import http from 'http';
import path from 'path';
import { processenv } from 'processenv';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const logger = flaschenpost.getLogger();

const auth0ClientId = processenv('AUTH0_CLIENT_ID', 'Ab9q8ucDeOG8H1CYg1jJmAzmcsJcNO92');
const auth0Domain = processenv('AUTH0_DOMAIN', 'webinar-zeitgemaesse-apis-in-nodejs.eu.auth0.com');
const auth0ClientSecret = processenv('AUTH0_CLIENT_SECRET', 'd8Br8dwkp6aRufuB3pU4A2ctrFGcrM_CDALDg7qpjGxN9E6KTj5-Z7OvYiriHgC6');
const auth0CallbackUrl = processenv('AUTH0_CALLBACK_URL', 'http://localhost:8080/callback');
const sessionSecret = processenv('SESSION_SECRET', 'thisIsAVerySecureSecret');

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
