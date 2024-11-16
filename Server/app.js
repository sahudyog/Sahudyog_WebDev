const express = require('express');
const bodyParser = require('body-parser');
const authRoute = require('./src/routers/authRouter.js');
const tripRoute = require('./src/routers/tripRouter.js');
const guideRoute = require('./src/routers/guideRouter.js');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '50mb' }));

// Serve API routes
app.use('/api/auth', authRoute);
app.use('/api/user', tripRoute);
app.use('/api/guide', guideRoute);

// Serve React static files
const clientBuildPath = path.join(__dirname, '../Client/build');
app.use(express.static(clientBuildPath));

// Fallback for React Router (client-side routing)
app.get('/vihaara/*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

module.exports = app;
