const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const uploadCloud = require('../configs/cloudinary');

const User       = require('../models/user-model');
const Action     = require('../models/actions-model');
const Comment    = require('../models/comment-model');
const Project    = require('../models/projects-model');
const Task       = require('../models/tasks-model');
const Team       = require('../models/teams-model');


router.post(`/add/:projectID/:actionID/:taskID`, (req,res,next) => {

  console.log('projectID ====== ' + req.params.projectID)
  console.log('actionID ====== ' + req.params.actionID)
  console.log('taskID ====== ' + req.params.taskID)
  console.log(req.body)


  const newComment = {
    description: req.body.description,
    owner: req.user.id,
    project: req.params.projectID,
    action: req.params.actionID,
    task: req.params.taskID
  }


  Comment.create(newComment)
  .then(comment => {

    Task.findByIdAndUpdate(req.params.taskID, { $push: { comments: comment.id }}, {new: true})
    .populate('comments')
    .then(response => {
      res.json(response)
    })
  })
})



module.exports = router;