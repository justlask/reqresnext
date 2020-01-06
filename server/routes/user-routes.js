const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const profileUploadCloud = require('../configs/profileCloudinary');

const User       = require('../models/user-model');
const Action     = require('../models/actions-model');
const Comment    = require('../models/comment-model');
const Project    = require('../models/projects-model');
const Task       = require('../models/tasks-model');
const Team       = require('../models/teams-model');
const bcrypt     = require('bcryptjs')
const passport   = require('passport')


router.post('/upload', profileUploadCloud.single("image"), (req, res, next) => {
 
  
  
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  User.findByIdAndUpdate(req.user.id, {image: req.file.secure_url})
  .populate('teams')
  .select("-password")
  .then(userInfo => {
    res.json(userInfo)
  })
  // res.json({ secure_url: req.file.secure_url });
});




router.get('/getuserinfo', (req, res, next) => {
  User.findById(req.user.id)
  .populate('teams')
  .populate({
    path : 'projects',
    model: Project,
    populate : {
      path : 'actions',
      model: Action,
      populate : {
        path : 'tasks',
        model: Task
      }
    }
  })
  .select("-password")
  .then(data => {
    res.json(data)
  })
});



router.post('/projects', (req,res,next) => {
  Project.find({ 
    $and: [ { members: { $in: req.body.userID } }, 
      { complete: req.body.select}]
    })
    .populate('members')
    .then(data => {
      res.json(data)
    })
});


router.post('/projectsbyteam', (req,res,next) => {
  Project.find({ 
    $and: [ { members: { $in: req.body.userID } }, 
      { team: req.body.select}]
    })
    .populate('members')
    .then(data => {
      res.json(data)
    })
});


router.post('/editprofile', (req,res,next) => {
  let userObj = req.body
  if (req.body.password === '') delete userObj.password
  if (req.body.password !== '') {
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    userObj.password = hashPass
  }

  User.findByIdAndUpdate(req.user.id, userObj, {new: true})
  .then(updatedUser => {
    res.json(updatedUser)
  });
});


module.exports = router;