'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    path = require('path'),
    mongoose = require('mongoose'),
    Sentence = mongoose.model('Sentence'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Sentence
 */
exports.create = function(req, res) {
    var sentence = new Sentence(req.body);
    sentence.user = req.user;

    sentence.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(sentence);
        }
    });
};

/**
 * Show the current Sentence
 */
exports.read = function(req, res) {
    res.jsonp(req.sentence);
};

/**
 * Update a sentence
 */
exports.update = function(req, res) {
    var sentence = req.sentence ;

    sentence = _.extend(sentence , req.body);

    sentence.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(sentence);
        }
    });
};

/**
 * Delete an sentence
 */
exports.delete = function(req, res) {
    var sentence = req.sentence ;

    sentence.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(sentence);
        }
    });
};

/**
 * List of sentence
 */
exports.list = function(req, res) { Sentence.find().sort('-created').populate('user', 'displayName').exec(function(err, sentence) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    } else {
        res.jsonp(sentence);
    }
});
};

/**
 * sentence middleware
 */
exports.sentenceByID = function(req, res, next, id) { Sentence.findById(id).populate('user', 'displayName').exec(function(err, sentence) {
    if (err) return next(err);
    if (! sentence) return next(new Error('Failed to load Sentence ' + id));
    req.sentence = sentence ;
    next();
});
};
