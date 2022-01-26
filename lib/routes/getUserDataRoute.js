const getUserDataRoute = function () {
  return (req, res) => {
    res.json({
      user: req.user
    });
  };
};

export {
  getUserDataRoute
};
