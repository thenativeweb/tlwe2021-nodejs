const secured = function (req, res, next) {
  if (req.user) {
    return next();
  }
  // eslint-disable-next-line no-param-reassign
  req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

export {
  secured
};
