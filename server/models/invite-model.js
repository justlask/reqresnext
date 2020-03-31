const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user-model')
const Team    = require('./teams-model');
const Project = require('./projects-model')

const inviteSchema = new Schema({
    email: String,
    team: {type : Schema.Types.ObjectId, ref: 'Team'},
    confirmationCode: String,
    invitedBy: {type: Schema.Types.ObjectId, ref: 'User'},
    accepted: {type: Schema.Types.Boolean, default: false}
  },
{
  timestamps: true
});

const Invite = mongoose.model('Invite', inviteSchema);
module.exports = Invite;