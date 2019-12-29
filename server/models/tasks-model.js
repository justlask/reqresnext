const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Project  = require('./projects-model');
const User     = require('./user-model')

const taskSchema = new Schema({
  title: String,
  description: String,
  project: {type: Schema.Types.ObjectId, ref: 'Project'},
  owner: {type: Schema.Types.ObjectId, ref: 'User'},
  done: {type: Boolean, default: false}
},
{timestamps: true});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;