import express from 'express';
import bodyParser from "body-parser";
import { config } from 'dotenv';

const db = require('./db');

config({ path: '.env' });

const app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin!);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
    next();
})

app.get('/api/v1/tasks', db.getTasks);
app.post('/api/v1/tasks', db.createTask);
app.put('/api/v1/tasks/:id', db.editTask);
app.delete('/api/v1/tasks/:id', db.deleteTask);
app.put('/api/v1/tasks/:id/complete', db.toggleTaskCompleted);

export default app;
