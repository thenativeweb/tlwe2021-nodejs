import express from 'express';
import { getAddTodoRoute } from '../../../lib/routes/getAddTodoRoute';
import supertest from 'supertest';

suite('getAddTodoRoute', () => {
  let app;

  setup(async () => {
    app = express();
    app.post('/addTodo', express.json(), getAddTodoRoute());
  });

  test('returns 400 and an error message if the content type is not json.', async () => {
    await supertest(app).
      post('/addTodo').
      set('Content-Type', 'text/plain').
      send('{"foo":"bar"}').
      expect('Content-Type', /json/u).
      expect(400).
      expect({ error: 'Expected json request.' });
  });

  test('returns 400 and an error message if the request body is malformed.', async () => {
    await supertest(app).
      post('/addTodo').
      set('Content-Type', 'application/json').
      send({ foo: 'bar' }).
      expect('Content-Type', /json/u).
      expect(400).
      expect({ error: 'Missing required property: title (at value.title).' });
  });

  test('returns 200 if the request is successful.', async () => {
    await supertest(app).
      post('/addTodo').
      set('Content-Type', 'application/json').
      send({ title: 'Foo.', isDone: false }).
      expect('Content-Type', /json/u).
      expect(200);
  });
});
