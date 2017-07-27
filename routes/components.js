var express = require('express');
var router = express.Router();

/* Catch URLs for messages and render them */

router.get('/uploadSuccess', function(req, res, next) {
    res.render('messages/playerModule2', { title: 'Mplay' });
});

router.get('/login', function(req, res, next) {
    res.render('components/login', { title: 'Mplay' });
});

router.get('/home', function(req, res, next) {
    res.render('components/home2', { title: 'Mplay' });
});


// General user routes
router.get('/userMenu/MyAccount', function(req, res, next) {
    res.render('components/userMenu/MyAccount');
});

router.get('/userMenu/MySongs', function(req, res, next) {
    res.render('components/userMenu/MySongs');
});


// Admin routes
router.get('/adminMenu/songs', function(req, res, next) {
    res.render('components/adminMenu/songs');
});

router.get('/adminMenu/users', function(req, res, next) {
    res.render('components/adminMenu/users');
});

router.get('/songUpload', function(req, res, next) {
    res.render('components/songUpload');
});


router.get('/aboutUs', function(req, res, next) {
    res.render('components/aboutUs1');
});

// player components
router.get('/player/emobar.php', function(req, res, next) {
    res.render('components/emotionbar', { title: 'Mplay' });
});


router.get('/player.php', function(req, res, next) {
    res.render('components/playerModule2', { title: 'Mplay' });
});

module.exports = router;
