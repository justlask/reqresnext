const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt     = require('bcryptjs')
const passport   = require('passport')
const nodemailer = require('nodemailer')

const profileUploadCloud = require('../configs/profileCloudinary');


const User       = require('../models/user-model');
const Action     = require('../models/actions-model');
const Comment    = require('../models/comment-model');
const Project    = require('../models/projects-model');
const Task       = require('../models/tasks-model');
const Team       = require('../models/teams-model');

router.post('/upload', profileUploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }

  User.findByIdAndUpdate(req.user.id, {image: req.file.secure_url}, {new:true})
  .populate('teams')
  .then(userInfo => {
    res.json(userInfo)
  })
});

router.get('/getuserinfo', (req, res, next) => {
  User.findById(req.user.id)
  .populate({
    path : 'teams',
    model: Team,
    populate : {
      path : 'members',
      model: User
    }
  })
  .populate({
    path : 'teams',
    model: Team,
    populate : {
      path : 'admin',
      model: User
    }
  })
  .populate({
    path : 'teams',
    model: Team,
    populate : {
      path : 'projects',
      model: Project
    }
  })
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
  Project.find({ team: req.body.select })
    .populate('projects')
    .populate('members')
    .then(data => {
      res.json(data)
    })
});


router.post('/editprofile', (req,res,next) => {
  let userObj = req.body
  if (req.body.password === '' || req.body.password === undefined) delete userObj.password
  else if (req.body.password !== '') {
    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(req.body.password, salt);

    userObj.password = hashPass
  }

  User.findByIdAndUpdate(req.user.id, userObj, {new: true})
  .then(updatedUser => {
    res.json(updatedUser)
  });
});


router.post('/contact', (req,res,next) => {
  let name = req.body.name
  let email = req.body.email
  let message = req.body.message

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODE_EMAIL,
      pass: process.env.NODE_PASS
    }
  });

  let messageWithContactInfo = `${message}<br><br> ${name} @ ${email}`

  transporter.sendMail({
    from: '"ReqResNext Contact Form" <reqresnext@gmail.com>',
    to: process.env.NODE_EMAIL,
    subject: `${name} has sent you a message about ReqResNext`, 
    text: messageWithContactInfo,
    html: messageWithContactInfo
  })
  .then(
      res.status(200).json({message: 'we have emailed you a link to reset your password.'})
  )
  .catch(error => console.log(error));
});


router.post('/deleteaccount', (req,res,next) => {

  User.findById(req.user._id)
  .then(theUser => {

    // handle logic for user having teams
    if (theUser.teams) {

      theUser.teams.forEach((team, i) => {
        if (team.admin === req.user._id) {
          // remove team from all members
          team.members.forEach((member, i) => {
            User.findByIdAndUpdate(member.id, {$pull: {teams: team._id}})
          })
          // remove team from all projects
          team.projects.forEach((project, i) => {
            Project.findByIdAndUpdate(project.id, {$pull: {team: team._id}})
          })
          // delete team
          Team.findByIdAndDelete(team._id)
        }
        else {
          //remove user from team
          Team.findByIdAndUpdate(team._id, {$pull: {members: req.user._id}})
        }
      })

        User.findByIdAndDelete(req.user._id)
        .then(response => {
  
          Project.deleteMany({owner: req.user._id})
          .then(projects => {
      
            Action.deleteMany({creator: req.user._id})
            .then(response => {
      
              Task.deleteMany({owner: req.user._id})
              .then(response => {
      
                Comment.deleteMany({owner: req.user._id})
                .then(response => {
                  req.logout();
                  res.json("fine, you're deleted")
                })
              })
      
            })
      
          })
        })
    }

    else {
      User.findByIdAndDelete(req.user.id)
      .then(response => {
    
        Project.deleteMany({owner: req.user.id})
        .then(projects => {
    
          Action.deleteMany({creator: req.user.id})
          .then(response => {
    
            Task.deleteMany({owner: req.user.id})
            .then(response => {
    
              Comment.deleteMany({owner: req.user.id})
              .then(response => {
                req.logout();
                res.json("fine, you're deleted")
              })
            })
    
          })
    
        })
      })
    }
  })

})


module.exports = router;