import fs from 'fs';
import path from 'path';
import express from 'express';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { App } from '../client/src/components/App';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve('build')));

app.get('*', (req, res) => {
    const reactApp = ReactDOMServer.renderToString(<App />);
    const indexFile = path.resolve('build/index.html');

    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(
            data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
        );
    });
});

app.listen(PORT, console.log(`Server is running on http://localhost:${PORT}`));