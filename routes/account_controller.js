var express = require('express');
var router = express.Router();
const { accounts } = require('../models');

/**
 * Nifty piece of middleware which ensures
 * the user is authenticated before granting access to the route
 */
const guard = (req, res, next) => {
  if(!req.user) res.render('error', { message: 'You are not authorized to view that content!', error: { status: 403, stack: '' } });
  next();
}

/**
 * TODO: This route should be protected so that only
 * users who are logged in can access it!
 */
router.get('/', guard, async (req, res) => {
  // Find all the accounts for a user
  const acc = await accounts.findAll();
  res.render('accounts', { accounts: acc });
});

module.exports = router;
