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

/// loading components for App




module.exports = router;