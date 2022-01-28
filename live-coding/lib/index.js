import express from 'express';
import http from 'http';
import path from "path";
import { fileURLToPath } from 'url';
import cors from 'cors';
import { getAddTodoRoute } from './routes/getAddTodoRoute';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import expressSession from 'express-session';
import { processenv } from 'processenv';
import {getLoginRoute} from "./routes/getLoginRoute";
import {getCallbackRoute} from "./routes/getCallbackRoute";
import {getLogoutRoute} from "./routes/getLogoutRoute";

const auth0ClientId = processenv('AUTH0_CLIENT_ID', 'Ab9q8ucDeOG8H1CYg1jJmAzmcsJcNO92');
const auth0Domain = processenv('AUTH0_DOMAIN', 'webinar-zeitgemaesse-apis-in-nodejs.eu.auth0.com');
const auth0ClientSecret = processenv('AUTH0_CLIENT_SECRET', 'd8Br8dwkp6aRufuB3pU4A2ctrFGcrM_CDALDg7qpjGxN9E6KTj5-Z7OvYiriHgC6');
const auth0CallbackUrl = processenv('AUTH0_CALLBACK_URL', 'http://localhost:8080/callback');
const sessionSecret = processenv('SESSION_SECRET', 'thisIsVerySecure(Not)');

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const htmlRoot = path.join(rootDirectory, 'html');
const sessionConfig = {
    secret: sessionSecret,
    cookie: {},
    resave: false,
    saveUninitialized: false
};
const auth0Strategy = new Auth0Strategy({
    domain: auth0Domain,
    clientID: auth0ClientId,
    clientSecret: auth0ClientSecret,
    callbackURL: auth0CallbackUrl
}, (accessToken, refreshToken, extraParams, profile, done) => {
    done(null, profile);
});

passport.use(auth0Strategy);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

const app = express();

app.use(expressSession(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

app.get(
    '/login',
    passport.authenticate('auth0', { scope: 'openid email profile' }),
    getLoginRoute()
);
app.get(
    '/callback',
    getCallbackRoute({ passport })
);
app.get(
    '/logout',
    getLogoutRoute({ auth0Domain, auth0ClientId })
);

app.get('/', cors(), (req, res) => {
    res.sendFile(path.join(htmlRoot, 'root.html'));
});
app.get(
    '/private',
    (req, res, next) => {
        if (req.user) {
            next();

            return;
        }

        req.session.returnTo = req.originalUrl;
        res.redirect('/login');
    },
    (req, res) => {
        res.sendFile(path.join(htmlRoot, 'private.html'));
    }
);
app.get('/greet/:name', (req, res) => {
    res.send(`Hello ${req.params.name}?!\n`);
});
app.post(
    '/addTodo',
    cors(),
    express.json(),
    getAddTodoRoute()
);

const server = http.createServer(app);

server.listen(8_080, () => {
    console.log('Server has been started.');
});
