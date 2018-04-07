const express = require('express');
const router = express.Router();
const passport = require('passport');

const { User } = require('../models/user');

/* Register page */
router.get('/register', (req, res, next) => {
  res.render('register');
});

/* Login page */
router.get('/login', (req, res, next) => {
  res.render('login');
});

/* Register users - Server */
router.post('/register', (req, res) => {
  const account = new User({
    email: req.body.email,
    username: req.body.username
  });
  let password = req.body.password;

  User.register(account, password)
    .then(() => {
      passport.authenticate('local')
      (req, res, () => {
        req.flash('success_msg', 'Congratulations! You are registered. Please log in.');
        res.redirect('/users/login');
      })
    }).catch((e) => {
      res.render('register', {
        info: "The account you entered already exists."
      });
    });

  
  // var name = req.body.name;
  // var email = req.body.email;
  // var username = req.body.username;
  // var password = req.body.password;
  // var password2 = req.body.password2;

  // // Validation
  // req.checkBody('name', 'Name is required').notEmpty();
  // req.checkBody('email', 'Email is required').notEmpty();
  // req.checkBody('email', 'Email is not valid').isEmail();
  // req.checkBody('username', 'Username is required').notEmpty();
  // req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // var errors = req.validationErrors();

  // if (errors) {
  //   res.render('register', {
  //     errors: errors
  //   });
  // } else {
  //   var newUser = new User({
  //     name: name,
  //     email: email,
  //     username: username,
  //     password: password
  //   });

  //   User.createUser(newUser, (err, user) => {
  //     if (err) throw err;
  //     console.log(user);
  //   });

  //   req.flash('success_msg', 'You are registered and can now login');

  //   res.redirect('/users/login');
  // }
});

/* Login */
router.post('/login',
  passport.authenticate('local', { 
    successRedirect: '/', 
    failureRedirect: '/users/login', 
    failureFlash: true 
  }), (req, res) => {
    res.redirect('/');
  });

/* Logout */
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

/* Log in with Google */
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

/* Callback Route for Google redirect */
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // res.send(req.user);
  res.redirect('/');
});

module.exports = router;
