const getCallbackRoute = function ({ passport }) {
  return (req, res, next) => {
    passport.authenticate('auth0', (authenticateError, user) => {
      if (authenticateError) {
        return next(authenticateError);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, loginError => {
        if (loginError) {
          return next(loginError);
        }
        const { returnTo } = req.session;

        // eslint-disable-next-line no-param-reassign
        delete req.session.returnTo;
        res.redirect(returnTo ?? '/');
      });
    })(req, res, next);
  };
};

export {
  getCallbackRoute
};
