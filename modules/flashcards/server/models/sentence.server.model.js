'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Sentence Schema
 */
var SentenceSchema = new Schema({
	sentence:{
        jp: {type: String},
        fr: {type: String},
        en: {type: String}
    },
    sound: {
        jp: {type: Buffer},
        fr: {type: Buffer},
        en: {type: Buffer}
    },
    cards: {
        jp: [{type: Schema.ObjectId, ref: 'Card'}],
        fr: [{type: Schema.ObjectId, ref: 'Card'}],
        en: [{type: Schema.ObjectId, ref: 'Card'}]
    },
    grammar: [{
        type: Schema.ObjectId, ref : 'Grammar'
    }]

});

mongoose.model('Sentence', SentenceSchema);
