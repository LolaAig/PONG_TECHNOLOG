import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

export function applyConfig(app: express.Application) {
    app.use(bodyParser.json());
}