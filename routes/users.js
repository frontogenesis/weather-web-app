const express = require('express');
const router = express.Router();

const user = require('../models/user');

/* Register users - Front End */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* Log users in to front end */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* Register users - Server */
router.post('/register', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;
  let confirm = req.body.confirm;

  // Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);
  let errors = req.validationErrors();
  if (errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    let newUser = new User({
      name,
      email,
      username,
      password
    });

    User.createUser(newUser, (err, user) => {
      if (err) throw err;
      console.log(user)
    });
  }
});

module.exports = router;
