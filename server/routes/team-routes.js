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


router.get('/getmyteams', (req,res,next) => {
  User.findById(req.user.id)
  .populate('teams')
  .then(response => {
    res.json(response.teams)
  })
});

router.post('/create', (req,res,next) => {
  let newTeam = {
    name: req.body.name,
    admin: req.user.id,
    members: [req.user.id]
  }
  Team.create(newTeam)
  .then(newTeam => {
    User.findByIdAndUpdate(req.user.id, { $push: { teams: newTeam.id }})
    .then(response => {
      res.json(newTeam)
    })
  })
});



router.post('/addproject', (req,res,next) => {
  //
  console.log(req.body)
  res.json('sup from the backend')
})


router.post('/sendinvite', (req,res,next) => {
  let name = req.user.name
  let email = req.body.email
  let teamID = req.body.team._id
  let teamName = req.body.team.name

  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let confirmationCode = '';

  for (let i = 0; i < 25; i++) {
    confirmationCode += characters[Math.floor(Math.random() * characters.length )];
  }

  //determine if email has an account
  User.findOne({email: email})
  .then(foundUser => {


    // make sure a user cant invite someone who is already a member
    if (foundUser.teams.includes(teamID)) {
      res.status(400).json({message: "This user is already a member of the team!"})
    }

    // the user already has an account
    else if (!foundUser.teams.includes(teamID)) {
      console.log(name, email, teamID, teamName)

      // add the invite to the user account
      User.findByIdAndUpdate(foundUser.id, 
        {$push: {invites: {
          team: teamID,
          confirmationCode: confirmationCode,
          invitedBy: req.user.id}}
        })
        .then(response => {
          // send an email to them and let them know they've been invited
          let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.NODE_EMAIL,
              pass: process.env.NODE_PASS
            }
          });
    
          let messageWithContactInfo = `Hi there! ${name} has invited you to join ${teamName} on ReqResNext.<br>`
    
          transporter.sendMail({
            from: '"ReqResNext Team Invite" <reqresnext@gmail.com>',
            to: email,
            subject: `${name} has invited you to join their team, ${teamName}!`, 
            text: messageWithContactInfo,
            html: messageWithContactInfo
          })
          .then(
            // add the invite info to the team for checks
            Team.findByIdAndUpdate(teamID, {$push : {
              invites: { 
                email: email,
                confirmationCode: confirmationCode,
                invitedBy: req.user.id
              }
            }})
            .then(response => {
              res.status(200).json({message: "We have sent an email to the user letting them know you've invited them!"})
            })
          ).catch(error => console.log(error));
      })
    }
    else {
      //the user doesnt have an account

      //send an invite to reqresnext
      let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.NODE_EMAIL,
          pass: process.env.NODE_PASS
        }
      });

      // let messageWithContactInfo = `${message}<br><br> ${name} @ ${email}`

      // transporter.sendMail({
      //   from: '`${name} invites you to ReqResNext` <reqresnext@gmail.com>',
      //   to: process.env.NODE_EMAIL,
      //   subject: `${name} has sent you a message about ReqResNext`, 
      //   text: messageWithContactInfo,
      //   html: messageWithContactInfo
      // })
      // .then(
      //     res.status(200).json({message: 'this user doesn't have an account, we have sent them an email invite.'})
      // )
      // .catch(error => console.log(error));

      res.json('leeee do it')

    }


  })
  // determine if email doent have an account and send pitch and invite

});



router.get('/join/:teamID/:email/:confirmationCode', (req,res,next) => {

});






module.exports = router;