// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const xss = require('xss-filters');
const validator = require('validator');

var passport	= require('passport');
var jwt         = require('jwt-simple');
var config = require('../../config/app');
require('../../config/passport')(passport);
var router = express.Router();


function getModel () {
    return require(`./datastore`);
}


// Automatically parse request body as JSON
router.use(bodyParser.json());
global.app.use(passport.initialize());
//list user by user id.
// this api route should be protected
router.post('/byUserEmail',  passport.authenticate('jwt', { session: false}), (req, res, next) => {
    console.log(req.headers);
    var token = getToken(req.headers);
    req.body.email = xss.inHTMLData(req.body.email);
    req.body.pageToken = xss.inHTMLData(req.body.pageToken);
    if (token && validator.isEmail(req.body)) {
        var decoded = jwt.decode(token, config.secret);
        getModel().getUserByEmail(req.body.email,10, req.body.pageToken, (err, entities, cursor) => {
            if (err) {
                next(err);
                return;
            }
            res.json({
                items: entities,
                nextPageToken: cursor
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided or invalid Email'});
    }
});

// this api route should be protected

router.post('/authUser', (req, res, next) => {
    req.body.email = xss.HTMLData(req.body.email);
    req.body.password = xss.HTMLData(req.body.password);
    if(validator.isEmail(req.body.email)){
        getModel().getUserByEmail(req.body.email,10, null, (err, entities, cursor) => {
            if (err) {
                next(err);
                return;
            }
            console.log(entities);
            if(entities.length==1){
                comparePassword(entities[0].password, req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(entities[0], config.secret);
                        entities[0].password=null;
                        // return the information including token as JSON
                        var user = {username:entities[0].username, email:entities[0].email, imageURL: entities[0].imageURL}
                        res.json({success: true, token: 'JWT ' + token, user: user});
                    } else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
            else{
                res.send({success: false, msg: 'Authentication failed. Invalid User.'});
            }
        });
    }
    else{
        res.send({success: false, msg: 'Authentication failed. Invalid Email'});
    }
});



/**
 * POST /api/user/addNew
 *
 * Create a new user.
 */
// this api route should be protected
router.post('/addNew', (req, res, next) => {
    sanitation(req.body);
    if(validateUser(req.body)) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(req.body.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                req.body.password = hash;
                getModel().create(req.body, (err, entity) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.status(200).send('OK');
                });
            });
        });
    }else{
        res.status(501).send('Invalid Data');
    }
});

var comparePassword = function (dbpassw, passw, cb) {
    bcrypt.compare(passw, dbpassw, function (err, isMatch) {
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    })
}





/**
 * Errors on "/api/user/*" routes.
 */
router.use((err, req, res, next) => {
    // Format error and forward to generic error handler for logging and
    // responding to the request
    err.response = {
        message: err.message,
        internalCode: err.code
    };
    next(err);
});

//function to extract authorization header from headers

var getToken = function (headers) {
    console.log(headers.authorization);
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

function validateUser(obj){
    if(validator.isEmail(obj.email) && validator.isAlphanumeric(obj.username)){
        return true;
    }else{
        return false;
    }
}

function sanitation(obj){
    obj.email = xss.inHTMLData(obj.email);
    obj.password = xss.inHTMLData(obj.password);
    obj.username = xss.inHTMLData(obj.username);
}

module.exports = router;
