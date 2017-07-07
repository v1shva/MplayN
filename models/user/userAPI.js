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
var passport	= require('passport');
var jwt         = require('jwt-simple');
var config = require('../../config/app');
var router = express.Router();

function getModel () {
    return require(`./datastore`);
}


// Automatically parse request body as JSON
router.use(bodyParser.json());

//list user by user id.
router.get('/byUserID', (req, res, next) => {
    getModel().listByUserID(req.query.userID,10, req.query.pageToken, (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.json({
            items: entities,
            nextPageToken: cursor
        });
    });
});

router.get('/byUserEmail', (req, res, next) => {
    getModel().getUserByEmail(req.query.email,10, req.query.pageToken, (err, entities, cursor) => {
        if (err) {
            next(err);
            return;
        }
        res.json({
            items: entities,
            nextPageToken: cursor
        });
    });
});

router.post('/authUser', (req, res, next) => {
    console.log(req.body);
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
                   // return the information including token as JSON
                   res.json({success: true, token: 'JWT ' + token});
               } else {
                   res.send({success: false, msg: 'Authentication failed. Wrong password.'});
               }
           });
       }
       else{
           res.send({success: false, msg: 'Authentication failed. Invalid User.'});
       }
    });

});



/**
 * POST /api/user/addNew
 *
 * Create a new user.
 */
router.post('/addNew', (req, res, next) => {
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
 * PUT /api/books/:id
 *
 * Update a book.
 */
router.put('/:book', (req, res, next) => {
    getModel().update(req.params.book, req.body, (err, entity) => {
        if (err) {
            next(err);
            return;
        }
        res.json(entity);
    });
});

/**
 * DELETE /api/books/:id
 *
 * Delete a book.
 */
router.delete('/:book', (req, res, next) => {
    getModel().delete(req.params.book, (err) => {
        if (err) {
            next(err);
            return;
        }
        res.status(200).send('OK');
    });
});

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

module.exports = router;
