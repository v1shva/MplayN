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
const validator = require('validator');
const xss = require('xss-filters');
const songs = require('../cloudstorage/songs');
var router = express.Router();
var passport	= require('passport');
var jwt         = require('jwt-simple');
var config = require('../../config/app');
require('../../config/passport')(passport);


function getModel () {
    return require(`./datastore`);
}


// Automatically parse request body as JSON
router.use(bodyParser.json());
global.app.use(passport.initialize());
/**
 * GET /api/songs
 *
 * Retrieve a page of songs (up to ten at a time).
 */

router.get('/byEmotion', (req, res, next) => {
    var emotion = xss.inHTMLData(req.query.emotion);
    if(validator.isAlphanumeric(emotion)){
        getModel().listByEmotion(emotion,10, req.query.pageToken, (err, entities, cursor) => {
            if (err) {
                next(err);
                return;
            }
            res.json({
                items: entities,
                nextPageToken: cursor
            });
        });
    };

});

// this api route should be protected
router.get('/byUserID',passport.authenticate('jwt', { session: false}), (req, res, next) => {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    var userID = decoded.id;
    if(validator.isAlphanumeric(userID)){
        getModel().listByUserID(userID,10, req.query.pageToken, (err, entities, cursor) => {
            if (err) {
                next(err);
                return;
            }
            res.json({
                items: entities,
                nextPageToken: cursor
            });
        });
    }
});

/**
 * POST /api/songs
 *
 * Create a new song using song upload.
 */
// this api route should be protected
router.post(
    '/uploadSong',
    passport.authenticate('jwt', { session: false}),
    songs.multer.single('file'),
    songs.sendUploadToGCS,
    (req, res, next) => {
        let data = req.body;
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        if (req.file && req.file.cloudStoragePublicUrl) {
            data.url = req.file.cloudStoragePublicUrl;
        }
        changeEmotionProperty(data);
        sanitation(data);
        data.userID = decoded.id;
        // Save the data to the database.
        getModel().create(data, (err, savedData) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });

    }
);


/**
 * POST /api/songs
 *
 * Create a new song using song URL.
 */
// this api route should be protected
router.post(
    '/addNew',
    passport.authenticate('jwt', { session: false}),
    (req, res, next) => {
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);
        let data = req.body;
        data.userID = decoded.id;
        sanitation(data);
        // Save the data to the database.
        getModel().create(data, (err, savedData) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });
    }
);



/**
 * Errors on "/api/songAPI/*" routes.
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

//required functions .....
function changeEmotionProperty(obj) {
    var re = new RegExp("0$"), key;
    for (key in obj)
        if (re.test(key)) {
            obj[key]= parseInt(obj[key]);
            obj[key] = xss.inHTMLData(obj[key]);
        }
    return null; // This should not be possible
}

function sanitation(obj){
    obj.title =  xss.inHTMLData(obj.title);
    obj.artist = xss.inHTMLData(obj.artist);
    obj.url = xss.inHTMLData(obj.url);
}

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

module.exports = router;
