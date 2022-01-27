import { Parser } from 'validate-value';

const todoParser = new Parser({
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1
    },
    description: {
      type: 'string',
      minLength: 1
    },
    isDone: { type: 'boolean' }
  },
  required: [ 'title', 'isDone' ]
});

const getAddTodoRoute = function () {
  return (req, res) => {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(400).json({ error: 'Expected json request.' });

      return;
    }

    const parseResult = todoParser.parse(req.body);

    if (parseResult.hasError()) {
      res.status(400).json({ error: parseResult.error.message });

      return;
    }

    // Add the todo to the list of todos. Do some domain logic.

    res.status(200).send({ success: 'Successfully added new todo.' });
  };
};

export {
  getAddTodoRoute
};
