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
  let teamID = req.body.team
  let projectID = req.body.project

  // add team to project
  Project.findByIdAndUpdate(projectID, {team: teamID})
  .then(response => {
      //add project to team
      Team.findByIdAndUpdate(teamID, {$push: {projects: projectID}})
      .then(response => {
        // add all members to the project's members
        Project.findByIdAndUpdate(projectID, {$push: {members: response.members}})
        .then(response => {
          res.json('Project has a team, team has a project, project has members')
        })
      })
  })
})

router.post('/removeproject', (req,res,next) => {
  let teamID = req.body.team
  let projectID = req.body.project

  // remove team from project
  Project.findByIdAndUpdate(projectID, {team: {$pull: teamID}})
  .then(response => {
      // remove project from team
      Team.findByIdAndUpdate(teamID, {$pull: {projects: projectID}})
      .then(response => {
        // add all members to the project's members
        Project.findByIdAndUpdate(projectID, {$pull: {members: response.members}})
        .then(response => {
          res.json('Project has no team, team has no project, project has no members')
        })
      })
  })
})


router.post('/removemember', (req,res,next) => {
  let teamID = req.body.team
  let memberID = req.body.member

  Team.findById(teamID)
  .then(response => {
    if (response.admin.toString() == req.user._id.toString()) {
      res.json('you cannot remove yourself')
    }
    else {
      Team.findByIdAndUpdate(teamID, {$pull: {members: memberID}}, {new:true})
      .then(response => {
        User.findByIdAndUpdate(memberID, {$pull: { teams: teamID }})
        .then(user => {
          res.json(response)
        })
      })
    }
  })
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

    if (!foundUser) {
      Invite.create(
        {
        email: email,
        team: teamID,
        confirmationCode: confirmationCode,
        invitedBy: req.user.id
        })
        .then(response => {

          Team.findByIdAndUpdate(teamID, {$push : {
            invites: { 
              email: email,
              confirmationCode: confirmationCode,
              invitedBy: req.user.id
            }
          }})
          .then(response => {

            let transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: process.env.NODE_EMAIL,
                pass: process.env.NODE_PASS
              }
            });
      
            let messageWithContactInfo = `Hi there!<br><br> ${name} has invited you to join their team '${teamName}' on ReqResNext.<br><br> But we
            noticed that you don't have an account!<br><br> Joining their team will allow you to have access to their projects, which will allow you to
            collaborate together. Please visit https://www.reqresnext.com/join/${teamID}/${confirmationCode} to join their team.
            <br><br>
            Welcome to ReqResNext and happy coding!`
      
            transporter.sendMail({
              from: '"ReqResNext Team Invite" <reqresnext@gmail.com>',
              to: email,
              subject: `${name} invites you to join a team on ReqResNext!`, 
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
    // make sure a user cant invite someone who is already a member
    else if (foundUser.teams.includes(teamID)) {
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
    
          let messageWithContactInfo = `Hi there!<br><br> ${name} has invited you to join the team '${teamName}' on ReqResNext.<br>`
    
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
  })

});



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