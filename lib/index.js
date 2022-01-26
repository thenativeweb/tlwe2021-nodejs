import Auth0Strategy from 'passport-auth0';
import express from 'express';
import expressSession from 'express-session';
import { fileURLToPath } from 'url';
import { flaschenpost } from 'flaschenpost';
import { getCallbackRoute } from './routes/getCallbackRoute';
import { getLoginRoute } from './routes/getLoginRoute';
import { getLogoutRoute } from './routes/getLogoutRoute';
import { getPrivateRoute } from './routes/getPrivateRoute';
import { getRootRoute } from './routes/getRootRoute';
import http from 'http';
import passport from 'passport';
import path from 'path';
import { processenv } from 'processenv';
import { secured } from './middlewares/secured';

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const logger = flaschenpost.getLogger();

const auth0ClientId = processenv('AUTH0_CLIENT_ID', 'Ab9q8ucDeOG8H1CYg1jJmAzmcsJcNO92');
const auth0Domain = processenv('AUTH0_DOMAIN', 'webinar-zeitgemaesse-apis-in-nodejs.eu.auth0.com');
const auth0ClientSecret = processenv('AUTH0_CLIENT_SECRET', 'd8Br8dwkp6aRufuB3pU4A2ctrFGcrM_CDALDg7qpjGxN9E6KTj5-Z7OvYiriHgC6');
const auth0CallbackUrl = processenv('AUTH0_CALLBACK_URL', 'http://localhost:8080/callback');
const sessionSecret = processenv('SESSION_SECRET', 'thisIsAVerySecureSecret');

(async () => {
  const sessionConfig = {
    secret: sessionSecret,
    cookie: {},
    resave: false,
    saveUninitialized: false
  };
  const htmlRoot = path.join(rootDirectory, 'html');
  const auth0Strategy = new Auth0Strategy(
    {
      domain: auth0Domain,
      clientID: auth0ClientId,
      clientSecret: auth0ClientSecret,
      callbackURL: auth0CallbackUrl
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      done(null, profile);
    }
  );

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
  app.get(
    '/private',
    secured,
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
