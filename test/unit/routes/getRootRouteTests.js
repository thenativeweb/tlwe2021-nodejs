import { assert } from 'assertthat';
import express from 'express';
import { fileURLToPath } from 'url';
import { getRootRoute } from '../../../lib/routes/getRootRoute';
import path from 'path';
import supertest from 'supertest';

const currentdirectory = path.dirname(fileURLToPath(import.meta.url));
const htmlRoot = path.join(currentdirectory, '..', '..', '..', 'lib', 'html');

suite('getRootRoute', () => {
  let app;

  setup(async () => {
    app = express();
    app.get('/', getRootRoute({ htmlRoot }));
  });

  test(`returns the root route's html.`, async () => {
    const response = await supertest(app).
      get('/').
      expect('Content-Type', /html/u).
      expect(200);

    assert.that(response.text).is.containing('<a href="/private">Private</a>');
  });
});
