/*
exports.index = function(req, res){
    res.render('index', { title: 'Mplay' });
};*/

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Mplay' });
});

router.get('/partials/login', function(req, res, next) {
    res.render('partials/login', { title: 'Mplay' });
});

router.get('/partials/home', function(req, res, next) {
    res.render('partials/home', { title: 'Mplay' });
});

router.get('/partials/myAccount', function(req, res, next) {
    res.render('partials/myAccount');
});

router.get('/components/login', function(req, res, next) {
    res.render('components/login', { title: 'Mplay' });
});

router.get('/components/userMenuMain', function(req, res, next) {
    res.render('components/userMenu/MyAccount');
});


/*router.get('/test', function(req, res, next) {
    res.render('partials/playerTest', { title: 'Mplay' });
});*/

router.get('/player.php', function(req, res, next) {
    res.render('playerModule2', { title: 'Mplay' });
});


module.exports = router;