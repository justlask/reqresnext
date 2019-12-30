const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Project  = require('./projects-model');
const User     = require('./user-model')
const Action   = require('./actions-model')
const Team     = require('./teams-model')
const Comment  = require('./comment-model')

const taskSchema = new Schema({
  title: String,
  description: String,
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  complete: {type: Boolean, default: false},
  type: {type: String, enum: ["front-end", "back-end", "bug", "idea"]},
  action: {type: Schema.Types.ObjectId, ref: 'Action'},
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
},
{timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;