const express = require('express');
const morgan = require('morgan');
const { NODE_ENV } = require('./config/env');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const pino = require('pino-http')();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(helmet());
app.use(cors());

//logger
app.use(pino);

// to disable the X-Powered-By header that gives information about the framework
app.disable('x-powered-by');
// or app.use(helmet.hidePoweredBy());

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('tiny'));
}

app.use(require('./routes'));

//404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

// Error handling for CSP violations
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    return res.status(403).render('error', {
      message: 'CSRF token validation failed',
    });
  }
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Error' });
});

module.exports = app;
