import express from 'express';
import { fileURLToPath } from 'url';
import { flaschenpost } from 'flaschenpost';
import http from 'http';
import path from 'path';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const logger = flaschenpost.getLogger();

(async () => {
  const htmlRoot = path.join(rootDirectory, 'html');

  const app = express();

  app.get(
    '/private',
    (req, res) => {
      res.sendFile(path.join(htmlRoot, 'private.html'));
    }
  );
  app.get(
    '/',
    (req, res) => {
      res.sendFile(path.join(htmlRoot, 'root.html'));
    }
  );

  const server = http.createServer(app);

  server.listen(8_080, () => {
    logger.info('Server is running.');
  });
})();
