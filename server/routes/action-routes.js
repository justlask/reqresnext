const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');


router.get('/:actionID', (req,res,next) => {
  Action.findById(req.params.actionID)
  .populate('tasks')
  .then(response => {
    res.json(response)
  })
});



router.post('/:projectID/addaction', (req,res,next) => {

  let newAction = {
    title: req.body.title,
    description: req.body.description,
    project: req.params.projectID,
    creator: req.user._id,
    members: [ req.user._id ],
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




module.exports = router;