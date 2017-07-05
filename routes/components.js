var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.render('components/login', { title: 'Mplay' });
});

router.get('/home', function(req, res, next) {
    res.render('components/home1', { title: 'Mplay' });
});

router.get('/userMenuMain', function(req, res, next) {
    res.render('components/userMenu/MyAccount');
});

router.get('/songUpload', function(req, res, next) {
    res.render('components/songUpload');
});

router.get('/aboutUs', function(req, res, next) {
    res.render('components/aboutUs');
});

/*router.get('/test', function(req, res, next) {
 res.render('partials/playerTest', { title: 'Mplay' });
 });*/

router.get('/player/emobar.php', function(req, res, next) {
    res.render('components/emotionbar', { title: 'Mplay' });
});

router.get('/player/emobarPlaylist.php', function(req, res, next) {
    res.render('components/emotionbarPlaylist', { title: 'Mplay' });
});

router.get('/player.php', function(req, res, next) {
    res.render('components/playerModule2', { title: 'Mplay' });
});

router.get('/uploadSuccess', function(req, res, next) {
    res.render('components/uploadSuccess', { title: 'Mplay' });
});

module.exports = router;
