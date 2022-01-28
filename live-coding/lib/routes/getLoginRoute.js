const getLoginRoute = function () {
  return (req, res) => {
    res.redirect('/');
  };
};

export {
  getLoginRoute
};
