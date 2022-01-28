import express from 'express';
import {getAddTodoRoute} from "../../lib/routes/getAddTodoRoute";
import supertest from 'supertest';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

suite('getAddTodoRoute', () => {
    let app;

    setup(async () => {
        app = express();

        app.post('/addTodo', express.json(), getAddTodoRoute());
    });

    test('returns 400 if the content type is not json.', async () => {
        await supertest(app).
            post('/addTodo').
            set('Content-Type', 'text/plain').
            send('{"foo": "bar"}').
            expect('Content-Type', /json/u).
            expect(StatusCodes.BAD_REQUEST).
            expect({ error: ReasonPhrases.BAD_REQUEST });
    });

    test('returns 400 if the request is malformed.', async () => {
        await supertest(app).
            post('/addTodo').
            set('Content-Type', 'application/json').
            send({ foo: 'bar' }).
            expect('Content-Type', /json/u).
            expect(StatusCodes.BAD_REQUEST).
            expect({ error: ReasonPhrases.BAD_REQUEST });
    });

    test('returns 200 if the request is successful', async () => {
        await supertest(app).
            post('/addTodo').
            set('Content-Type', 'application/json').
            send({ title: 'Foo.', isDone: false }).
            expect('Content-Type', /json/u).
            expect(StatusCodes.OK).
            expect({ todo: { title: 'Foo.', isDone: false }});
    });
});
