const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Team    = require('./teams-model');
const Project = require('./projects-model')

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  image: {type: String, default: 'https://www.livesafemobile.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'},
  position: {type: String, enum: ["web developer", "developer", "front-end developer", "back-end developer", "designer", "ux designer", "ui designer", "qa engineer", "project manager"]},
  teams: [ { type : Schema.Types.ObjectId, ref: 'Team' } ],
  projects: [{type: Schema.Types.ObjectId, ref: 'Project'}]
}, 
{
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;