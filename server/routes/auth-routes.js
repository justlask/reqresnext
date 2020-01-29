
const express    = require('express');
const authRoutes = express.Router();

const passport   = require('passport');
const bcrypt     = require('bcryptjs');

// require the user model !!!!
const User       = require('../models/user-model');
const nodemailer = require('nodemailer')


authRoutes.post('/signup', (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
  
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
  
        const aNewUser = new User({
            name: name,
            email: email,
            password: hashPass
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
            
                // Send the user's information to the frontend
                // We can use also: res.status(200).json(req.user);
                res.status(200).json(aNewUser);
            });
        });
    });
});



authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      console.log(theUser)
      if (err) {
          res.status(500).json({ message: 'Something went wrong authenticating user' });
          console.log('if err')
          console.log(err)
          return;
      }
  
      if (!theUser) {
          console.log('if !theUser')
          // "failureDetails" contains the error messages
          // from our logic in "LocalStrategy" { message: '...' }.
          res.status(401).json(failureDetails);
          console.log(failureDetails)
          return;
      }

      // save user in session
      req.login(theUser, (err) => {
          if (err) {
              res.status(500).json({ message: 'Session save went bad.' });
              return;
          }

          // We are now logged in (that's why we can also send req.user)
          res.status(200).json(theUser);
      });
  })(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});


authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});



authRoutes.post('/resetpassword', (req,res,next) => {
    const email = req.body.email

    
    User.findOne({email: email})
    .then(foundUser => {
        console.log('user     ' + foundUser)
        if (foundUser === null) {
            // handle case if no email | username is found
            res.status(400).json({ message: 'No account with that email exists.'});
            return;
        }

        if (foundUser) {
            const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            let tempPass = '';

            for (let i = 0; i < 25; i++) {
              tempPass += characters[Math.floor(Math.random() * characters.length )];
            }

            const resetSalt     = bcrypt.genSaltSync(10);
            const resetPass = bcrypt.hashSync(tempPass, resetSalt);
            // change password to a random hashed pass

            User.findByIdAndUpdate(foundUser._id, {
                password: resetPass
            })
            .then(data => {
                // email that hashed pass to that email with nodemailer
                let transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: process.env.NODE_EMAIL,
                      pass: process.env.NODE_PASS
                    }
                  });
                  let message = `<b>Hi ${data.name},</b> <br><br> Your temporary password is ${tempPass}.<br><br> Please click <a href="http://www.reqresnext.com/login">here</a> to login with your temporary password.<br><br> Please remember to head to your profile and change your password once you've logged in.<br><br> Security, ya know.`

                  transporter.sendMail({
                    from: '"ReqResNext" <reqresnext@gmail.com>',
                    to: email,
                    subject: `Your Temporary Password for ReqResNext`, 
                    text: message,
                    html: `<b>Hi ${data.name},</b> <br><br> Your temporary password is ${tempPass}.<br><br> Please click <a href="http://www.reqresnext.com">here</a> to login with your temporary password.<br><br> Please remember to head to your profile and change your password once you've logged in.<br><br> Security, ya know.`
                  })
                  .then(
                      res.status(200).json({message: 'we have emailed you a link to reset your password.'})
                  )
                  .catch(error => console.log(error));

            })
            console.log(`the tempPass is ${tempPass}`)
            console.log(`the resetPass is ${resetPass}`)
        }
    });

  })

module.exports = authRoutes;