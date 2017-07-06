var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/loading', function(req, res, next) {
    res.render('messages/loading', { title: 'Mplay' });
});

router.get('/uploadSuccess', function(req, res, next) {
    res.render('components/home1', { title: 'Mplay' });
});

module.exports = router;
