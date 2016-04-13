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



module.exports = router;
