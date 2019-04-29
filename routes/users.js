var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { users } = require('../models');

/**
 * @GET /users
 * Finds all users
 */
router.get('/', (req, res, next) => {
  users.findAll().then(users => {
    res.json(users);
  })
});

/**
 * @GET /users/:id
 * Finds a single user given their ID
 */
router.get('/:id', (req, res) => {
  users.findByPk(req.params.id).then(user => res.json(user));
});


/**
 * @POST /users/create
 * Creates a new user in the database
 */
router.post('/create', (req, res) => {
  console.log(req.body.password, req.body.email, req.body.username);
  // Hash the user password
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    users.create({
      ...req.body,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(() => res.render('login'));
  });
});

/**
 * @PUT /users/update/:id
 * Updates a user in the database with new information
 */
router.put('/update/:id', (req, res) => {
  users.update({ ...req.body, updatedAt: new Date() }, { returning: true, where: { id: req.params.id }})
    .then(updatedUser => res.json(updatedUser));
});

/**
 * @DELETE /users/destroy/:id
 * Deletes a user from the database permanently.
 */
router.delete('/destroy/:id', (req, res) => {
  users.destroy({ where: { id: req.params.id }})
    .then(() => res.json({ destroyed: true, id: req.params.id }));
});

module.exports = router;
