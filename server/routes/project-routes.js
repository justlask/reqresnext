// // /api/projects	GET	(empty)	Returns all the projects
// // /api/projects	POST	JSON	Adds a new project
// // /api/projects/:id	GET	(empty)	Returns the specified project
// // /api/projects/:id	PUT	JSON	Edits the specified project
// // /api/projects/:id	DELETE	(empty)	Deletes the specified project

// // /api/projects

// const express = require('express');
// const mongoose = require('mongoose');
// const router  = express.Router();

// const Project = require('../models/projects-model');
// const Task    = require('../models/tasks-model')


// //get all tasks
// router.get('/', (req,res,next) => {
//   Project.find().populate('tasks').then(response => {
//     res.json(response)
//   }).catch(err => {
//     res.json(err)
//   })
// })


// //find project by id
// router.get('/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }         

//   Project.findById(req.params.id).populate('tasks')
//     .then(response => {
//       res.status(200).json(response);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })


// //create new project
// router.post('/', (req, res, next)=>{
 
//   Project.create({
//     title: req.body.title,
//     description: req.body.description,
//     tasks: [],
//     owner: req.user._id
//   })
//     .then(response => {
//       res.json(response);
//     })
//     .catch(err => {
//       res.json(err);
//     })
// });


// // PUT route => to update a specific project
// router.put('/:id', (req, res, next)=>{
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Project.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => {
//       res.json({ message: `Project with ${req.params.id} is updated successfully.` });
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })


// // delete project by id
// router.delete('/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Project.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.json({ message: `Project with ${req.params.id} is removed successfully.` });
//     })
//     .catch( err => {
//       res.json(err);
//     })
// })



// // GET route => to retrieve a specific task
// router.get(':projectId/tasks/:taskId', (req, res, next) => {
//   Task.findById(req.params.taskId)
//   .then(theTask =>{
//       res.json(theTask);
//   })
//   .catch( err =>{
//       res.json(err);
//   })
// });


// module.exports = router;