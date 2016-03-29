var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  next()
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'index' });
  //res.redirect('/login');
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'home' });
  //res.redirect('/login');
});


module.exports = router;
