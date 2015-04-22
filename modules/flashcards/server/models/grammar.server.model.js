'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Grammar Schema
 */
var GrammarSchema = new Schema({
    name: {
        type: String
    },
    level: {
        type: Number
    }

});

mongoose.model('Grammar', GrammarSchema);
