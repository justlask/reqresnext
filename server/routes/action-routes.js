const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');
const Comment    = require('../models/comment-model');


router.get('/:actionID', (req,res,next) => {
  Action.findById(req.params.actionID)
  .populate('tasks')
  .populate('project')
  .then(response => {
    res.json(response)
  })
});



router.post('/:projectID/addaction', (req,res,next) => {
  let newAction = {
    title: req.body.actionInfo.title,
    description: req.body.actionInfo.description,
    project: req.params.projectID,
    creator: req.user._id,
    members: [ req.user._id ]
  }

  if (req.body.image) {
    newAction.image = req.body.image
  }

  // add action
  Action.create(newAction)
  .then(action => {
    // add actionID to project
    Project.findByIdAndUpdate(req.params.projectID, { $push: { actions: action.id }}, {new: true})
    .then(data => {
      res.json(data)
    })

  })
});

router.post('/update', (req,res,next) => {
  let updatedAction = req.body.actionInfo

  if (req.body.image) updatedAction.image = req.body.image

  Action.findByIdAndUpdate(req.body.actionID, updatedAction)
  .then(response => {
    res.json(response)
  })
});

router.post('/delete/:projectID/:actionID', (req,res,next) => {
  //find action and delete it
  Action.findByIdAndDelete(req.params.actionID)
  .then(response => {
    //find action's project and remove the action id from it's list
    Project.findByIdAndUpdate(req.params.projectID, { $pull: { actions: req.params.actionID }}, {new: true})
    .then(data => {

      // find tasks of that action and delete those
      Task.deleteMany({action: req.params.actionID})
      .then(response => {

        // find comments of that action and delete those too
        Comment.deleteMany({action: req.params.actionID})
        .then(response => {
          res.json(data)
        })
      })
    })
  })
});

router.post('/markcomplete/:actionID', (req,res,next) => {

  Action.findByIdAndUpdate(req.params.actionID, {complete: true})
  .then(response => {
    res.json(response)
  })

});

router.post('/markincomplete/:actionID', (req,res,next) => {

  Action.findByIdAndUpdate(req.params.actionID, {complete: false})
  .then(response => {
    res.json(response)
  })

});




module.exports = router;