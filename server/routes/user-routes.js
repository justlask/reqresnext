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

  User.findByIdAndUpdate(req.user.id, {image: req.file.secure_url})
  .populate('teams')
  .select("-password")
  .then(userInfo => {
    res.json(userInfo)
  })
  // res.json({ secure_url: req.file.secure_url });
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
  .select("-password")
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
  console.log('hi')
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

  User.findById(req.user.id)
  .then(theUser => {

    // handle logic for user having teams
    if (theUser.teams) {
      // find each team
      // remove user from each team
      let userProjects = {}
      theUser.projects.forEach(project => {
        userProjects[project] = project
      })

      res.json('oops')


      // see if the teams have any projects
      // User.projects forEach(project)
      // if team projects includes project
      // pull that project from the array
      // pull that project from all members array

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

  // Team.find({members: {$in: req.user.id}})
  // .then(teams => {
  //   teams.forEach(team => {
  //     Team.findByIdAndUpdate(team.id, {$pull: {members: req.user.id}})
  //     .then(response => {

  //       Team.fin

  //     })
  //   })
  // })

})


module.exports = router;