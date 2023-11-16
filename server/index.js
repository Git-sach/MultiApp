const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res, next) => {
    res.type('application/javascript');
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(4000);