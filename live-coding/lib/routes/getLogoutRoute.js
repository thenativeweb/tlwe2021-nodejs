import querystring from 'query-string';
import { URL } from 'url';

const getLogoutRoute = function ({ auth0Domain, auth0ClientId }) {
  return (req, res) => {
    req.logOut();

    const port = req.socket.localPort;
    const returnTo = `${req.protocol}://${req.hostname}:${port}/`;

    const logoutURL = new URL(
      `https://${auth0Domain}/v2/logout`
    );

    const searchString = querystring.stringify({
      // eslint-disable-next-line camelcase
      client_id: auth0ClientId,
      returnTo
    });

    logoutURL.search = searchString;

    res.redirect(logoutURL.toString());
  };
};

export {
  getLogoutRoute
};
