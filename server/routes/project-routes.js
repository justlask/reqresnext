const express = require('express');
const mongoose = require('mongoose');
const router  = express.Router();

const uploadCloud = require('../configs/cloudinary')

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');
const Comment     = require('../models/comment-model');
const Team        = require('../models/teams-model');

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

router.post('/byteam', (req,res,next) => {

  let select = (req.body.isCurrent === 'Current Projects') ? false : true

  if (!req.body.team) {
    //get all projects that they own
    // and all projects for the teams they belong to
      Project.find({ 
        $or: [
          { $and: [ 
                { team: { $in: req.user.teams } }, 
                { complete: select}] },
          { $and: [ 
                { owner: req.user.id }, 
                { complete: select}] }
        ]
        })
        .then(data => {
          res.json(data)
        })

  }
  else {
    //get only that teams projects
    Team.findById(req.body.team._id)
    .then(response => {
      Project.find({ 
        $and: [ { _id: { $in: response.projects } }, 
          { complete: select}]
        })
        .then(data => {
          res.json(data)
        })
    })

  }

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
  let newProject = {
    title: req.body.title,
    description: req.body.description,
    owner: req.user.id,
  }

  if (req.body.image) {
    newProject.image = req.body.image
  }
  if (req.body.team) {
    newProject.team = req.body.team
  }

  Project.create(newProject)
  .then(project => {
    if (req.body.team) {
      // adds project to team
      Team.findByIdAndUpdate(req.body.team, {$push: {projects: project.id}}, {new:true})
      .then(response => {
        res.json(response)
      })
    }
    else {
      User.findByIdAndUpdate(req.user.id, { $push: { projects: project.id }}, {new: true})
      .then(data => {
        res.json(project)
      })
    }
  })
});


router.post('/update', (req,res,next) => {
  let updatedProject = req.body.projectInfo

  if (req.body.image) updatedProject.image = req.body.image


  Project.findByIdAndUpdate(req.body.projectID, updatedProject, {new: true})
  .then(response => {
    res.json(response)
  })
});



router.post('/delete/:projectID', (req,res,next) => {
  console.log('lets delete')
  //gotta DELETE IT ALLLLL *pokemon voice*


  Project.findById(req.params.projectID)
  .then(project => {

    //if project has a team and the user trying to delete is the owner
    if (project.team && req.user._id.toString() === project.owner.toString()) {
      // remove project from team
      Team.findByIdAndUpdate(project.team, {$pull: {projects: req.params.projectID}})
      .then(response => {

        Project.findByIdAndDelete(req.params.projectID)
        .then(response => {
      
          //find and delete all actions of that project
          Action.deleteMany({project: req.params.projectID})
          .then(response => {
            
            //delets all tasks relating to that project
            Task.deleteMany({project: req.params.projectID})
            .then(response => {
              
              //deletes all comments relating to that project
              Comment.deleteMany({project: req.params.projectID})
              .then(response => {
      
                res.json(response)
      
              })
            })
          })
        })
      })
    }
    // else if the project doesn't have a team and the owner is the user
    else if (!project.team && req.user._id.toString() === project.owner.toString()) {

    Project.findByIdAndDelete(req.params.projectID)
    .then(response => {

    //find and delete all actions of that project
    Action.deleteMany({project: req.params.projectID})
    .then(response => {
      
      //delets all tasks relating to that project
      Task.deleteMany({project: req.params.projectID})
      .then(response => {
        
        //deletes all comments relating to that project
        Comment.deleteMany({project: req.params.projectID})
        .then(response => {


          //then delete project from user array
              User.findByIdAndUpdate(req.user.id, { $pull: { projects: req.params.projectID }})
              .then(response => {
                res.json(response)
              })
            })
          })
        })
      })
    }
    // if the user has the project in their projects, but they aren't the owner.
    else {
      res.json('you are not authorized to delete this project')
    }
  })
});

router.post('/markcomplete/:projectID', (req,res,next) => {
  Project.findByIdAndUpdate(req.params.projectID, {complete: true}, {new: true})
  .then(response => {
    res.json(response)
  })
})

router.post('/markincomplete/:projectID', (req,res,next) => {
  Project.findByIdAndUpdate(req.params.projectID, {complete: false}, {new: true})
  .then(response => {
    res.json(response)
  })
})








module.exports = router