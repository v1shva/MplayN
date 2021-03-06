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
const storage = require('../cloudstorage/storage');
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

router.post('/rateSong',passport.authenticate('jwt', { session: false}), (req, res, next) => {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    req.body[decoded.id.concat("l")] = 'like';
    if(validator.isAlphanumeric(decoded.id)){
        getModel().update(req.body.id, req.body, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });
    }
});

router.post('/dislikeSong',passport.authenticate('jwt', { session: false}), (req, res, next) => {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    req.body[decoded.id.concat("d")] = 'dislike';
    if(validator.isAlphanumeric(decoded.id)){
        getModel().update(req.body.id, req.body, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });
    }
});


var moment = require('moment');

router.post('/reportSong',passport.authenticate('jwt', { session: false}), (req, res, next) => {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, config.secret);
    req.body[decoded.id.concat("r")] = 'report';
    var time = moment();
    var time_format = time.format('YYYY-MM-DD HH:mm:ss Z');
    console.log(time_format);
    decoded.password = "";
    var reportDetails = {reportedUser: decoded, date:time_format, resolved: "no"};
    req.body["reported"] = reportDetails;
    console.log(req.body);
    if(validator.isAlphanumeric(decoded.id)){
        getModel().update(req.body.id, req.body, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });
    }
});

/**
 * POST /api/songs
 *
 * Create a new song using song upload.
 */
// this api route should be protected
router.post('/uploadSong', passport.authenticate('jwt', { session: false}), storage.multer.single('file'), storage.sendUploadToGCS, (req, res, next) => {
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
        data.uploaded = decoded.id;
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
router.post('/addNew', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);
        let data = req.body;
        data.uploaded = decoded.id;
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

router.post('/playCount', (req, res, next) => {
    getModel().read(req.body.id, (err, song) => {
        if (err) {
            next(err);
            return;
        }
        var currentCount = parseInt(song.playCount);
        song.playCount = currentCount + 1;
        getModel().update(req.body.id, song, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });
    });
});

router.post('/getLikedSongs', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);

        // Save the data to the database.
        getModel().likedSongsList(decoded.id,10, req.query.pageToken, (err, entities, cursor) => {
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
);

router.post('/getDislikedSongs', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);

        // Save the data to the database.
        getModel().dislikedSongsList(decoded.id,10, req.query.pageToken, (err, entities, cursor) => {
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
);

router.post('/getReportedSongs', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);

        // Save the data to the database.
        getModel().reportedSongsList(decoded.id,10, req.query.pageToken, (err, entities, cursor) => {
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
);

router.post('/getUploadedSongs', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        var token = getToken(req.headers);
        var decoded = jwt.decode(token, config.secret);

        // Save the data to the database.
        getModel().uploadedSongsList(decoded.id,10, req.query.pageToken, (err, entities, cursor) => {
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
);


// admin and mod only routes
router.post('/getAllReported', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    let token = getToken(req.headers);
    let decoded = jwt.decode(token, config.secret);
    if (decoded.userLevel==="admin" || decoded.userLevel==="mod"){
        let accessKey = jwt.decode(decoded.userLevelToken, config.secret);
        if(accessKey.admin === "allow" || accessKey.mod === "allow"){
            getModel().listAllReported(10, req.body.pageToken, (err, entities, cursor) => {
                if (err) {
                    next(err);
                    return;
                }
                /*entities.forEach( function (user)
                 {
                 if(decoded.id === user.id) {
                 var index = entities.indexOf(user);
                 if (index > -1) {
                 entities.splice(index, 1);
                 }
                 };

                 });*/
                res.json({
                    items: entities,
                    nextPageToken: cursor
                });
            });
        } else {
            return res.status(403).send({success: false, msg: 'Access denied. invalid access key'});
        }
    }
    else {
        return res.status(403).send({success: false, msg: 'Access denied. invalid access level'});
    }
    }
);

router.post('/deleteReported', passport.authenticate('jwt', { session: false}), (req, res, next) => {
        let token = getToken(req.headers);
        let decoded = jwt.decode(token, config.secret);
        if (decoded.userLevel==="admin" || decoded.userLevel==="mod"){
            let accessKey = jwt.decode(decoded.userLevelToken, config.secret);
            if(accessKey.admin === "allow" || accessKey.mod === "allow"){
                req.body.songs.forEach( function (song)
                {
                    getModel().delete(song, (err) => {
                        if (err) {
                            next(err);
                            return;
                        }
                    });
                });
                return res.status(403).send({success: true, msg: 'Done'});
            } else {
                return res.status(403).send({success: false, msg: 'Access denied. invalid access key'});
            }
        }
        else {
            return res.status(403).send({success: false, msg: 'Access denied. invalid access level'});
        }
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
            obj[key] = xss.inHTMLData(obj[key]);
            obj[key]= parseInt(obj[key]);
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
