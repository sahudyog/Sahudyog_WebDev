const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./src/routers/authRouter.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('Hello from the middleware 👋');
    next();
});

app.use('/api/auth', authRoute);

module.exports = app;
