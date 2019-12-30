const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user-model')
const Action   = require('./actions-model')
const Task     = require('./tasks-model')
const Team     = require('./teams-model')

const projectSchema = new Schema({
  title: String,
  image: {type: String, default: 'https://i.stack.imgur.com/pbW7A.png'},
  description: String,
  actions: [[{type: Schema.Types.ObjectId, ref: 'Action'}]],
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  members: [{type: Schema.Types.ObjectId, ref: 'User'}],
  team: {type: Schema.Types.ObjectId, ref: 'Team'},
  complete: {type: Boolean, default: false}
},
{timestamps: true});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;