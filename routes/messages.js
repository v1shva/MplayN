var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loading', function(req, res, next) {
    res.render('messages/loading', { title: 'Mplay' });
});

router.get('/uploadSuccess', function(req, res, next) {
    res.render('messages/uploadSuccess', { title: 'Mplay' });
});

router.get('/signUpError', function(req, res, next) {
    res.render('messages/signUpError', { title: 'Mplay' });
});
router.get('/signUpSuccess', function(req, res, next) {
    res.render('messages/signUpSuccess', { title: 'Mplay' });
});

module.exports = router;
