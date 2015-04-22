'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Flashcard Schema
 */
var FlashcardSchema = new Schema({
	word: {
        jp : {type: String, default:'', trim: true},
        fr : {type: String, default:'', trim: true},
        en : {type: String, default:'', trim: true}
	},
    sentences: {
        jp: [{type: Schema.ObjectId, ref: 'Sentence'}],
        fr: [{type: Schema.ObjectId, ref: 'Sentence'}],
        en: [{type: Schema.ObjectId, ref: 'Sentence'}]
    },
    prononciation: {
        jp : {type: String}
    },
    sound:{
        jp: {type: Buffer},
        fr: {type: Buffer},
        en: {type: Buffer}
    },
    level :{
        type: Number,
        default: 0
    },


	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Flashcard', FlashcardSchema);
