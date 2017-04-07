var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mplay' });
});

router.get('/loginSignup.php', function(req, res, next) {
    res.render('loginSignup', { title: 'Mplay' });
});

router.get('/test.php', function(req, res, next) {
    res.render('test', { title: 'Mplay' });
});



module.exports = router;
