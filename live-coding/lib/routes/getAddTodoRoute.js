import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const getAddTodoRoute = () => {
    return (req, res) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(StatusCodes.BAD_REQUEST).json({ error: ReasonPhrases.BAD_REQUEST });

            return;
        }

        if (!(
            'title' in req.body && typeof req.body.title === 'string' &&
            'isDone' in req.body && typeof req.body.isDone === 'boolean' &&
            (!('description' in req.body) || typeof req.body.description === 'string')
        )) {
            res.status(StatusCodes.BAD_REQUEST);
            res.json({ error: ReasonPhrases.BAD_REQUEST });
            return;
        }

        res.json({ todo: req.body });
    }
};

export {
    getAddTodoRoute
};
