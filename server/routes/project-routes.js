const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');



router.get('/:projectID', (req,res,next) => {
  Project.findById(req.params.projectID)
  .populate({
    path: 'actions', model: Action 
  })
  .populate({
    path: 'tasks', model: Task
  })
  .populate({
    path: 'members', model: User
  })
  .then(data => {
    res.json(data)
  })
})




module.exports = router