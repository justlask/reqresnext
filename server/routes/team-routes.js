const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt     = require('bcryptjs')
const passport   = require('passport')
const nodemailer = require('nodemailer')

const profileUploadCloud = require('../configs/profileCloudinary');


const User       = require('../models/user-model');
const Action     = require('../models/actions-model');
const Comment    = require('../models/comment-model');
const Project    = require('../models/projects-model');
const Task       = require('../models/tasks-model');
const Team       = require('../models/teams-model');


router.get('/getmyteams', (req,res,next) => {
  User.findById(req.user.id)
  .populate('teams')
  .then(response => {
    res.json(response.teams)
  })
});

router.post('/create', (req,res,next) => {
  let newTeam = {
    name: req.body.name,
    admin: req.user.id,
    members: [req.user.id]
  }
  Team.create(newTeam)
  .then(newTeam => {
    User.findByIdAndUpdate(req.user.id, { $push: { teams: newTeam.id }})
    .then(response => {
      res.json(newTeam)
    })
  })
});






module.exports = router;