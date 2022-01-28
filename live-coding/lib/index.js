import express from 'express';
import http from 'http';
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const htmlRoot = path.join(rootDirectory, 'html');

app.get('/',(req, res) => {
    res.sendFile(path.join(htmlRoot, 'root.html'));
});
app.get('/private',(req, res) => {
    res.sendFile(path.join(htmlRoot, 'private.html'));
});
app.get('/greet/:name', (req, res) => {
    res.send(`Hello ${req.params.name}!\n`);
});

const server = http.createServer(app);

server.listen(8_080, () => {
    console.log('Server has been started.');
});
