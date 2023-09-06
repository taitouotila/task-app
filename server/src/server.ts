import express from 'express';
import { Request, Response } from 'express';
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
    // const allowedOrigins = ['http://localhost:3000', 'http://172.29.148.240:3000', 'http://192.168.50.88:3000'];
    // const origin = req.headers.origin!;
    // if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin!);
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
})

app.get('/api/v1/tasks', db.getTasks);
app.post('/api/v1/tasks', db.createTask);
app.put('/api/v1/tasks/:id', db.editTask);
app.delete('/api/v1/tasks/:id', db.deleteTask);
app.put('/api/v1/tasks/:id/complete', db.completeTask);

export default app;
