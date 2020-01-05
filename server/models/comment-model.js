const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Project  = require('./projects-model');
const User     = require('./user-model')
const Action   = require('./actions-model')
const Team     = require('./teams-model')
const Task     = require('./tasks-model')
const moment = require('moment');

const commentSchema = new Schema({
  description: String,
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  action: {type: Schema.Types.ObjectId, ref: 'Action'},
  task: {type: Schema.Types.ObjectId, ref: 'Task'},
  date: Number,
},
{timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;