const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectionManager = require('./connection')
const indexRouter = require('./routes/index');
const tradesRouter = require('./routes/trades');
const bodyParser = require('body-parser');

const app = express();
connectionManager.getConnection()
    .catch(err => {
        console.log(err)
        process.exit(1)
    })

// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.use('/trades', tradesRouter);
app.use('/', indexRouter);

module.exports = app;
