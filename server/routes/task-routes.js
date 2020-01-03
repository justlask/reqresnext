const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');


router.post('/complete/:taskID', (req,res,next) => {
  console.log(req.params.taskID)
  Task.findByIdAndUpdate(req.params.taskID, {complete: true}, {new: true})
  .then(response => {
    res.json(response)
  })
})



router.post('/addtask/:actionID', (req,res,next) => {

  const newTask = {
    title: req.body.title,
    owner: req.user.id,
    type: req.body.type,
    action: req.params.actionID,
  }

  Task.create(newTask)
  .then(newTask => {
    Action.findByIdAndUpdate(req.params.actionID, { $push: { tasks: newTask.id }}, {new: true})
    .populate('members')
    .populate('tasks')
    .then(response => {
      console.log(response)
      res.json(response)
    })
  })

})






module.exports = router;