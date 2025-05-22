const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { NODE_ENV } = require('./config/env');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

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

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { title: 'Error' });
});

module.exports = app;
