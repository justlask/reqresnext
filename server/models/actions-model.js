const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User    = require('./user-model')
const Task    = require('./tasks-model')
const Team    = require('./teams-model')
const Project = require('./projects-model')

const actionSchema = new Schema({
  title: String,
  image: {type: String, default: 'https://i.stack.imgur.com/pbW7A.png'},
  description: String,
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  creator: {type: Schema.Types.ObjectId, ref: 'User'},
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  complete: {type: Boolean, default: false},
  project: {type: Schema.Types.ObjectId, ref: 'Project'}
},
{timestamps: true}
);

const Action = mongoose.model('Action', actionSchema);

module.exports = Action;