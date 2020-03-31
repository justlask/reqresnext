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
const Invite     = require('../models/invite-model')


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
    admin: req.user.id
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
  // add team to project
  Project.findByIdAndUpdate(req.body.project._id, { team: req.body.team._id })
  .then(response => {
      //add project to team
      Team.findByIdAndUpdate(req.body.team._id, {$push: {projects: req.body.project._id}})
      .then(response => {
        res.json('project has a team, team has a project')
      })
  })
})

router.post('/removeproject', (req,res,next) => {
  // remove team from project
  Project.findByIdAndUpdate(req.body.project._id, {team: undefined})
  .then(response => {
      // remove project from team
      Team.findByIdAndUpdate(req.body.team._id, {$pull: {projects: req.body.project._id}})
      .then(response => {
        res.json('team has 1 less project, project has 1 less team')
      })
  })
})


router.post('/removemember', (req,res,next) => {
  let teamID = req.body.team
  let memberID = req.body.member

  Team.findById(teamID)
  .then(theTeam => {
    if (theTeam.admin.toString() == req.user._id.toString() == memberID.toString()) {
      res.json('you cannot remove yourself')
    }
    else if (theTeam.admin.toString() == req.user._id.toString()) {
      Team.findByIdAndUpdate(teamID, {$pull: {members: memberID}}, {new:true})
      .then(teamResponse => {
        User.findByIdAndUpdate(memberID, {$pull: { teams: teamID }})
        .then(user => {
          res.json(teamResponse)
        })
      })
    }
    else {
      res.json("you are not authorized to remove members")
    }
  })
})


router.post('/sendinvite', (req,res,next) => {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let confirmationCode = '';
  for (let i = 0; i < 25; i++) {
    confirmationCode += characters[Math.floor(Math.random() * characters.length )];
  }
  // determine if email has an account
  User.findOne({email: req.body.email})
  .then(foundUser => {
    if (!foundUser) {
      console.log('user does not have account')
      //create invite
      Invite.create({
        email: req.body.email,
        team: req.body.team._id,
        confimrationCode: confirmationCode,
        invitedBy: req.user.id,
        accepted: false
      })
      .then(response => {
        //add invite to team
        Team.findByIdAndUpdate(req.body.team._id, {$push: { invites: response._id }})
        .then(response => {
          //send email
          let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
            user: process.env.NODE_EMAIL,
            pass: process.env.NODE_PASS
            }
          });
                
          let messageWithContactInfo = `Hi there!<br><br> ${req.user.name} has invited you to join their team '${req.body.team.name}' on ReqResNext.<br><br> But we
            noticed that you don't have an account!<br><br> Joining their team will allow you to have access to their projects, which will allow you to
            collaborate together. Please visit https://www.reqresnext.com/join/${req.body.team._id}/${confirmationCode}/false to join their team.
            <br><br>
            Welcome to ReqResNext and happy coding!`
                
          transporter.sendMail({
            from: '"ReqResNext Team Invite" <reqresnext@gmail.com>',
            to: req.body.email,
            subject: `${req.user.name} invites you to join a team on ReqResNext!`, 
            text: messageWithContactInfo,
            html: messageWithContactInfo
          })
          .then(
            res.status(200).json({message: "this user doesn't have an account, we have sent them an email invite."})
          )
          .catch(error => console.log(error));
        })
      })
    }
    else if (foundUser.teams.includes(req.body.team._id)) {
      console.log('user already belongs to this team')
      res.json('user already belongs to this team')
    }
    else {
      console.log("user has an account and doesn't belong to the group")
      // create invite
      Invite.create({
        email: req.body.email,
        team: req.body.team._id,
        confimrationCode: confirmationCode,
        invitedBy: req.user.id,
        accepted: false
      })
      .then(response => {
        //add invite to team
        Team.findByIdAndUpdate(req.body.team._id, {$push: { invites: response._id }})
        .then(teamData => {
          //add invite to user
          User.findByIdAndUpdate(foundUser._id, {$push: {invites: response._id}})
          .then(response => {
            //send email
            let transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
              user: process.env.NODE_EMAIL,
              pass: process.env.NODE_PASS
              }
            });
                  
            let messageWithContactInfo = `Hi there!<br><br> ${req.user.name} has invited you to join their team '${req.body.team.name}' on ReqResNext.<br><br>
              Joining their team will allow you to have access to their projects, which will allow you to collaborate together. 
              Please visit https://www.reqresnext.com/join/${req.body.team._id}/${confirmationCode}/true to join their team.
              <br><br>
              Happy coding!`
                  
            transporter.sendMail({
              from: '"ReqResNext Team Invite" <reqresnext@gmail.com>',
              to: req.body.email,
              subject: `${req.user.name} invites you to join a team on ReqResNext!`, 
              text: messageWithContactInfo,
              html: messageWithContactInfo
            })
            .then(
              res.status(200).json({message: "this user has an account, we have sent them an email invite to join."})
            )
            .catch(error => console.log(error));
          })
          })
      })
    }
  })
});


router.post('/join/:teamID/:confirmationCode/:hasAccount', (req,res,next) => {
  console.log(req.params.teamID)
  console.log(req.params.confirmationCode)
  console.log(req.params.hasAccount)
  console.log('JOINNNNN')
})
router.post('/join/:teamID/:email/:confirmationCode', (req,res,next) => {
  // console.log(req.body)
  // console.log(req.params)
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const teamID = req.params.teamID
  const confirmationCode = req.params.confirmationCode
  
    if (!email || !password || !name) {
      res.status(400).json({ message: 'Provide a name, email and password' });
      return;
    }

    User.findOne({ email }, (err, foundUser) => {

        if(err){
            res.status(500).json({message: "email check went bad."});
            return;
        }

        if (foundUser) {
            res.status(400).json({ message: 'email taken. Choose another one.' });
            return;
        }
  
        const salt     = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);


        Invite.find({email: email, team: teamID})
        .then(theInvite => {
          if (theInvite[0].email === email && theInvite[0].confirmationCode === confirmationCode) {

            Project.find({team: teamID})
            .then(projects => {


              let projs = projects.map(project => {
                return project.id
              })

              const aNewUser = new User({
                name: name,
                email: email,
                password: hashPass,
                teams: [ teamID ],
                projects: projs
                });

                aNewUser.save(err => {

                  console.log('a new user id ===   ' + aNewUser.id)
                  if (err) {
                      res.status(400).json({ message: 'Saving user to database went wrong.' });
                      return;
                  }

                  Project.find({team: teamID})
                  .then(projects => {

                    projects.forEach(project => {

                      Project.findByIdAndUpdate(project.id, {$push: {members: aNewUser.id}})
                      .then(response => {
                          // Automatically log in user after sign up
                          // .login() here is actually predefined passport method
                          req.login(aNewUser, (err) => {
              
                            if (err) {
                                res.status(500).json({ message: 'Login after signup went bad.' });
                                return;
                            }
          
                            else {
                              // add the member to the team
          
                              Team.findByIdAndUpdate(teamID, {$push: {members: req.user.id}, $pull: {invites: {email: req.user.email}}})
                              .then(response => {

                                
                                // Send the user's information to the frontend
                                // We can use also: res.status(200).json(req.user);
                                res.status(200).json(aNewUser);
                              })
                            }
                        });

                        
                      })


                    })

                  })
    
                
              });
            })

            //delete the invite here! so user can only join once.
          }
          else {          

            const aNewUser = new User({
            name: name,
            email: email,
            password: hashPass,
            });

            aNewUser.save(err => {
              if (err) {
                  res.status(400).json({ message: 'Saving user to database went wrong.' });
                  return;
              }

              
              // Automatically log in user after sign up
              // .login() here is actually predefined passport method
              req.login(aNewUser, (err) => {
  
                  if (err) {
                      res.status(500).json({ message: 'Login after signup went bad.' });
                      return;
                  }

                  else {
                      // Send the user's information to the frontend
                      // We can use also: res.status(200).json(req.user);
                      res.status(200).json(aNewUser);
                  }
              });
          });
  
          }
        })

    });
});






module.exports = router;