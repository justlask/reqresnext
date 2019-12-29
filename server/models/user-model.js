const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Team    = require('./teams-model');
const Project = require('./projects-model')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: {type: String, default: 'https://i.ya-webdesign.com/images/default-avatar-png-18.png'},
  position: {type: String, enum: ["web developer", "developer", "front-end developer", "back-end developer", "designer", "ux designer", "ui designer", "qa engineer", "project manager"]},
  teams: [ { type : Schema.Types.ObjectId, ref: 'Team' } ],
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;