const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const uploadCloud = require('../configs/cloudinary')

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
});


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
      let notCompleted = 0
      let percent = 0
      
      response.actions.forEach(elem => {
        // console.log(elem)
        elem.tasks.forEach(task => {
          if (task.complete === true) {
            return completed += 1
          }
          else return notCompleted += 1
        })
      })
      percent = (((completed)/(completed+notCompleted))*100).toString()
      res.json(percent)
  })
});

router.post('/upload/mainimage', uploadCloud.single("image"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  console.log('the image is located at   ')
  console.log(req.file.secure_url)
  res.json({ secure_url: req.file.secure_url });
});


router.post('/create', (req,res,next) => {
  console.log(req.user.id)
  console.log(req.body)

  let newProject = {
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    owner: req.user.id,
    members: [ req.user.id ],
  }

  Project.create(newProject)
  .then(project => {
    res.json(project)
  })
});






module.exports = router