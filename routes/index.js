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


/// loading components for App
router.get('/components/login', function(req, res, next) {
    res.render('components/login', { title: 'Mplay' });
});

router.get('/components/home', function(req, res, next) {
    res.render('components/home', { title: 'Mplay' });
});

router.get('/components/userMenuMain', function(req, res, next) {
    res.render('components/userMenu/MyAccount');
});


/*router.get('/test', function(req, res, next) {
    res.render('partials/playerTest', { title: 'Mplay' });
});*/

router.get('/components/player/emobar.php', function(req, res, next) {
    res.render('components/emotionbar', { title: 'Mplay' });
});

router.get('/components/player/emobarPlaylist.php', function(req, res, next) {
    res.render('components/emotionbarPlaylist', { title: 'Mplay' });
});

router.get('/components/player.php', function(req, res, next) {
    res.render('components/playerModule2', { title: 'Mplay' });
});



module.exports = router;