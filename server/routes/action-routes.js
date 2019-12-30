const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');

const User        = require('../models/user-model');
const Project     = require('../models/projects-model');
const Task        = require('../models/tasks-model');
const Action      = require('../models/actions-model');


router.get('/:actionID', (req,res,next) => {
  console.log(req.params.actionID)




})




module.exports = router;