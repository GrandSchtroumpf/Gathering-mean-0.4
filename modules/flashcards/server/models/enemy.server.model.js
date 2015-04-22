'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Enemy Schema
 */
var EnemySchema = new Schema({
	name: {
        type: String
    },
    power: [{
        1 : {
            question: {type: Schema.ObjectId, ref: 'Sentence'},
            answers: [{type: Schema.ObjectId, ref: 'Sentence'}]
        },
        2: {
            question: {type: Schema.ObjectId, ref: 'Sentence'},
            answers: [{type: Schema.ObjectId, ref: 'Sentence'}]
        },
        3: {
            question: {type: Schema.ObjectId, ref: 'Sentence'},
            answers: [{type: Schema.ObjectId, ref: 'Sentence'}]
        }
    }],
    weakness: [{
        type: Schema.ObjectId, ref: 'Grammar'
    }],
    level: {
        type: Number
    }
});

mongoose.model('Enemy', EnemySchema);
