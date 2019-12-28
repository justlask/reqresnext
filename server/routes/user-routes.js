const express    = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cloudinary');
const axios = require('axios')

const User       = require('../models/user-model');


router.post('/upload', uploadCloud.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
})