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

function getModel () {
    return require(`./datastore`);
}


// Automatically parse request body as JSON
router.use(bodyParser.json());

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

router.get('/byUserID', (req, res, next) => {
    var userID = xss.inHTMLData(req.query.userID);
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
router.post(
    '/uploadSong',
    songs.multer.single('file'),
    songs.sendUploadToGCS,
    (req, res, next) => {
        let data = req.body;
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        if (req.file && req.file.cloudStoragePublicUrl) {
            data.url = req.file.cloudStoragePublicUrl;
        }
        changeEmotionProperty(data);
        sanitation(data);
        // Save the data to the database.
        getModel().create(data, (err, savedData) => {
            if (err) {
                next(err);
                return;
            }
            res.redirect(`/components/uploadSuccess`);
        });
    }
);

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
/**
 * POST /api/songs
 *
 * Create a new song using song URL.
 */
router.post(
    '/addNew',
    (req, res, next) => {
        let data = req.body;
        // Was an image uploaded? If so, we'll use its public URL
        // in cloud storage.
        console.log(data);
        sanitation(data);
        // Save the data to the database.
        getModel().create(data, (err, savedData) => {
            if (err) {
                next(err);
                return;
            }
        });
    }
);

/**
 * GET /api/books/:id
 *
 * Retrieve a book.
 */
router.get('/:book', (req, res, next) => {
    getModel().read(req.params.book, (err, entity) => {
        if (err) {
            next(err);
            return;
        }
        res.json(entity);
    });
});

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

module.exports = router;
