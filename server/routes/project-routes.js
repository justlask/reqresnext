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
    path: 'members', model: User
  })
  .populate({
    path: 'actions',
    model: Action,
    populate: {
      path: 'tasks',
       model: Task
      }
  })
  .then(data => {
    res.json(data)
  })
})


router.get('/calculatestatus/:projectID', (req,res,next) => {
  
  Project.findById(req.params.projectID)
  .populate({
    path: 'members', model: User
  })
  .populate({
    path: 'actions',
    model: Action,
    populate: {
      path: 'tasks',
       model: Task
      }
  })
  .then(response => {
      let completed = 0
      let total = 0
      let percent = 0
      
      response.actions.forEach(elem => {
        elem[0].tasks.forEach(task => {
            // console.log(task)

            if (task.complete === true) {
              return completed += 1
            }
            else return total += 1
        })
      })
      percent = (((completed)/(completed+total))*100).toString()
      res.json(percent)
  })
})



module.exports = router