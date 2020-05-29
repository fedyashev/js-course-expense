const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const creareError = require('http-errors');
const mongoose = require('mongoose');
const cors = require('cors');

const connestionString = 'mongodb://user:dummy1234@ds119969.mlab.com:19969/js_course_expenses';

mongoose
  .connect(connestionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(connection => {
    const [{name, host, port}, ...rest] = connection.connections;
    console.log(`Connection to ${host}:${port}/${name} success.`);
  })
  .catch(err => {
    console.log(`Connection to db failed.`)
  });

const api_v1 = require('./routes/api-v1.js');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', api_v1);

app.use(function(err, req, res, next) {
    const message = err.message || 'error';
    const code = err.statusCode || 500;
    res.status(code);
    res.json({ error: { code, message } });
});

module.exports = app;
