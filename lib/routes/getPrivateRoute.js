import path from 'path';

const getPrivateRoute = function ({ htmlRoot }) {
  return (req, res) => {
    res.sendFile(path.join(htmlRoot, 'private.html'));
  };
};

export {
  getPrivateRoute
};
