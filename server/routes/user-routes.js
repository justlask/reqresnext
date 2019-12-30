const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const uploadCloud = require('../configs/cloudinary');

const User       = require('../models/user-model');
const Action     = require('../models/actions-model');
const Comment    = require('../models/comment-model');
const Project    = require('../models/projects-model');
const Task       = require('../models/tasks-model');
const Team       = require('../models/teams-model')


router.post('/upload', uploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

router.get('/getuserinfo', (req, res, next) => {
  User.findById(req.user.id)
  .populate('teams').populate({
    path: 'projects',
    populate: {path: 'actions', model: Action, path: 'members', model: User}
  })
  .select("-password -email")
  .then(data => {
    res.json(data)
  })
});



// User.findOne({ name: 'Val' }).populate({
//   path: 'friends',
//   // Get friends of friends - populate the 'friends' array for every friend
//   populate: { path: 'friends' }
// });


module.exports = router;