var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

router.get('/signup', (req, res) => {
  res.render('signup', { user: req.user });
});

router.get('/login', (req, res) => {
  if(req.flash) res.render('login', { user: req.user, message: req.flash('error') });
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  if(req.logout) req.logout();
  res.redirect('/');
});

module.exports = router;
