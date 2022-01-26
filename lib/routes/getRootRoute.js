import path from 'path';

const getRootRoute = function ({ htmlRoot }) {
  return (req, res) => {
    res.sendFile(path.join(htmlRoot, 'root.html'));
  };
};

export {
  getRootRoute
};
