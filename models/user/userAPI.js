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
const storage = require('../cloudstorage/storage');
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
router.post('/byUserEmail', (req, res, next) => {
    req.body.email = xss.inHTMLData(req.body.email);
    if (true) {
        getModel().getUserByEmail(req.body.email, (err, user) => {
            if (err) {
                next(err);
                return;
            }
            if(user.length==1) res.send({success: true, msg: 'User found'});
            else res.send({success: false, msg: 'User not found'});

        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided or invalid Email'});
    }
});

router.post('/byUsername', (req, res, next) => {
    req.body.username = xss.inHTMLData(req.body.username);
    if (validator.isAlphanumeric(req.body.username)) {
        getModel().getUserByUsername(req.body.username, (err, user) => {
            if (err) {
                next(err);
                return;
            }
            if(user.length==1) res.send({success: true, msg: 'User found'});
            else res.send({success: false, msg: 'User not found'});

        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided or invalid Email'});
    }
});
// this api route should be protected

router.post('/authUser', (req, res, next) => {
    req.body.email = xss.inHTMLData(req.body.email);
    req.body.password = xss.inHTMLData(req.body.password);
    if(validator.isEmail(req.body.email)){
        var userDB;
        getModel().getUserByEmail(req.body.email, (err, user) => {
            userDB = user[0];
            if (err) {
                next(err);
                return;
            }
            console.log(userDB);
            if(userDB){
                comparePassword(userDB.password, req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        userDB.password=null;
                        var token = jwt.encode(userDB, config.secret);
                        // return the information including token as JSON
                        var user = {
                            username:userDB.username,
                            email:userDB.email,
                            imageURL: userDB.imageURL,
                            birthDate: userDB.birthDate,
                            country: userDB.country,
                            gender: userDB.gender,
                            firstName: userDB.firstName,
                            lastName: userDB.lastName,
                            userLevel: userDB.userLevel
                        }
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

// admin only routes

router.post('/getAllUsers', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    let token = getToken(req.headers);
    let decoded = jwt.decode(token, config.secret);
    if (decoded.userLevel==="admin"){
        let accessKey = jwt.decode(decoded.userLevelToken, config.secret);
        if(accessKey.admin === "allow"){
            getModel().listAllUsers(10, req.body.pageToken, (err, entities, cursor) => {
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

});

router.post('/deleteUsers', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    let token = getToken(req.headers);
    let decoded = jwt.decode(token, config.secret);
    if (decoded.userLevel==="admin"){
        let accessKey = jwt.decode(decoded.userLevelToken, config.secret);
        if(accessKey.admin === "allow"){
            req.body.users.forEach( function (user)
            {
                getModel().delete(user, (err) => {
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

});

router.post('/makeAdmin', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    req.body.id = xss.inHTMLData(req.body.id);
    let token = getToken(req.headers);
    let decoded = jwt.decode(token, config.secret);
    if (decoded.userLevel==="admin"){
        let accessKey = jwt.decode(decoded.userLevelToken, config.secret);
        if(accessKey.admin === "allow"){
            if (validator.isAlphanumeric(req.body.id)) {
                var priviledge = {admin: "allow"}
                var newToken = jwt.encode(priviledge, config.secret);
                getModel().read(req.body.id, (err, user) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    user.userLevelToken = newToken;
                    user.userLevel = "admin";
                    getModel().update(req.body.id, user, (err) => {
                        if (err) {
                            next(err);
                            return;
                        }
                        res.status(200).send('OK');
                    });
                });

            } else {
                return res.status(403).send({success: false, msg: 'No token provided or invalid id'});
            }
        } else {
            return res.status(403).send({success: false, msg: 'Access denied. invalid access key'});
        }
    }
    else {
        return res.status(403).send({success: false, msg: 'Access denied. invalid access level'});
    }

});

router.post('/makeMod', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    req.body.id = xss.inHTMLData(req.body.id);
    let token = getToken(req.headers);
    let decoded = jwt.decode(token, config.secret);
    if (decoded.userLevel==="admin"){
        let accessKey = jwt.decode(decoded.userLevelToken, config.secret);
        if(accessKey.admin === "allow"){
            if (validator.isAlphanumeric(req.body.id)) {
                var priviledge = {mod: "allow"}
                var newToken = jwt.encode(priviledge, config.secret);
                getModel().read(req.body.id, (err, user) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    user.userLevelToken = newToken;
                    user.userLevel = "mod";
                    getModel().update(req.body.id, user, (err) => {
                        if (err) {
                            next(err);
                            return;
                        }
                        res.status(200).send('OK');
                    });
                });

            } else {
                return res.status(403).send({success: false, msg: 'No token provided or invalid id'});
            }
        } else {
            return res.status(403).send({success: false, msg: 'Access denied. invalid access key'});
        }
    }
    else {
        return res.status(403).send({success: false, msg: 'Access denied. invalid access level'});
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
                req.body.userLevel = "user";
                req.body.imageURL = "https://storage.googleapis.com/mplay-151612.appspot.com/20170214_58a28e23853ae-210x210.png";
                getModel().create(req.body, (err, entity) => {
                    if (err) {
                        next(err);
                        return;
                    }
                    res.send({success: true, msg: 'User registered'});
                });
            });
        });
    }else{
        res.send({success: false, msg: 'Invalid data'});
    }
});

router.post('/updateUser', passport.authenticate('jwt', { session: false}), storage.multer.single('image'), storage.sendUploadToGCS,  (req, res, next) => {
    sanitation(req.body);
    let token = getToken(req.headers);
    let decoded = jwt.decode(token, config.secret);
    getModel().read(decoded.id, (err, user) => {
        if (err) {
            next(err);
            return;
        }
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.gender= req.body.gender;
        user.country = req.body.country;
        user.birthDate = req.body.birthDate;
        getModel().update(decoded.id, user, (err) => {
            if (err) {
                next(err);
                return;
            }
            res.status(200).send('OK');
        });
    });
});

let comparePassword = function (dbpassw, passw, cb) {
    bcrypt.compare(passw, dbpassw, function (err, isMatch) {
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    })
}


//Forgot password method when a user forgets a password
var async = require('async');
var crypto = require('crypto');


router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            getModel().getUserByEmail({ email: req.body.email }, function(err, user) {
                console.log(user);
                if (!user) {
                    res.json({success: false, message: 'User with that email doesn\'t exist'});
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var helper = require('sendgrid').mail;
            var fromEmail = new helper.Email('mailder@mplay.com');
            var toEmail = new helper.Email(user.email);
            var subject = 'MPlay Password Reset';
            var content = new helper.Content('text/plain', 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n');

            var mail = new helper.Mail(fromEmail, subject, toEmail, content);

            var sg = require('sendgrid')("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");
            var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
            });

            sg.API(request, function (error, response) {
                if (error) {
                    console.log('Error response received');
                }
                res.json({success: true, message: 'An email has been sent to your email address.'});
                console.log(response.statusCode);
                console.log(response.body);
                console.log(response.headers);
                done(error,'done');
            });

            /*var smtpTransport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: '!!! YOUR SENDGRID USERNAME !!!',
                    pass: '!!! YOUR SENDGRID PASSWORD !!!'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });*/
        }
    ], function(err) {
        if (err) return next(err);
        res.json({success: false, message: 'RedirectForgot'});
    });
});

router.get('/reset/:token', function(req, res) {
    getModel.getUserByResetPasswordToken({ resetPasswordToken: req.params.token, resetPasswordExpires: Date.now() }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forgot');
        }
        res.render('reset', {
            user: req.user
        });
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
