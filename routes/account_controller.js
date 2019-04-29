var express = require('express');
var router = express.Router();
const { accounts } = require('../models');

/**
 * TODO: This route should be protected so that only
 * users who are logged in can access it!
 */
router.get('/', async (req, res) => {
  // Find all the accounts for a user
  const acc = await accounts.findAll();
  res.render('accounts', { accounts: acc });
});

module.exports = router;
