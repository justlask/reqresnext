const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');
const Comment     = require('../models/comment-model')


router.post('/complete/:taskID', (req,res,next) => {
  Task.findByIdAndUpdate(req.params.taskID, {complete: true}, {new: true})
  .then(response => {
    res.json(response)
  })
})

router.get('/:actionID/:type', (req,res,next) => {
  if (req.params.type === undefined) {
    req.params.type = 'front-end'
  }
  Task.find({ $and: [ { action: { $in: req.params.actionID } }, { type: req.params.type}]})
  .populate({
    path: 'comments',
    model: Comment,
    populate: {
      path: 'owner',
       model: User
      }
  })
  .sort({complete: 1})
  .then(data => {
    res.json(data)
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
    .then(response => {

    Task.find({ $and: [ { action: { $in: req.params.actionID } }, { type: req.body.type}]})
      .populate({
        path: 'comments',
        model: Comment,
        populate: {
          path: 'owner',
           model: User
          }
      })
      .sort({complete: 1})
      .then(data => {
        res.json(data)
      })

    })
  })

})






module.exports = router;