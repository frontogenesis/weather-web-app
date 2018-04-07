var express = require('express');
var router = express.Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/users/login')
  } else {
    next();
  }
};

/* GET home page. */
router.get('/', authCheck, (req, res, next) => {
  res.render('index', { title: 'Weather',
    user: req.user.username
  });
});

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/users/login');
//   }
// };

module.exports = router;
