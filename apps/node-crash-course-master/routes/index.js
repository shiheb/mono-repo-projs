const express = require('express');
const router = express.Router();
const blogRoutes = require('./blogRoutes');

router.get('/', (req, res) => {
  res.redirect('/about');
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.use('/blogs', blogRoutes);

module.exports = router;
