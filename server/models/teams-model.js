const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User    = require('./user-model');
const Project = require('./projects-model')
const Invite = require('./invite-model')

const teamSchema = new Schema({
  name: String,
  image: String,
  admin: { type : Schema.Types.ObjectId, ref: 'User' },
  members: [{ type : Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type : Schema.Types.ObjectId, ref: 'Projects' }],
  invites: [{ type: Schema.Types.ObjectId, ref: 'Invite'}]
},
{
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;