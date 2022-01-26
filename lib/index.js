import express from 'express';
import { flaschenpost } from 'flaschenpost';
import http from 'http';

const logger = flaschenpost.getLogger();

(async () => {
  const app = express();

  app.get(
    '/private',
    (req, res) => {
      res.send('This is private.');
    }
  );
  app.get(
    '/',
    (req, res) => {
      res.send('Hello world!');
    }
  );

  const server = http.createServer(app);

  server.listen(8_080, () => {
    logger.info('Server is running.');
  });
})();
