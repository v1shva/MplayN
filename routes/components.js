var express = require('express');
var router = express.Router();

/* Catch URLs for messages and render them */

router.get('/uploadSuccess', function(req, res, next) {
    res.render('messages/playerModule2', { title: 'Mplay' });
});

module.exports = router;
