// // /api/tasks	POST	JSON	Adds a new task
// // /api/tasks/:id	GET	(empty)	Returns the specified task
// // /api/tasks/:id	PUT	JSON	Edits the specified task
// // /api/tasks/:id	DELETE	(empty)	Deletes the specified task


// // /api/tasks

// const express = require('express');
// const mongoose = require('mongoose');
// const router  = express.Router();

// const Project = require('../models/projects-model');
// const Task = require('../models/tasks-model');


// // POST route => to create a new task
// router.post('/', (req, res, next)=>{
  
//   Task.create({
//       title: req.body.title,
//       description: req.body.description,  
//       project: req.body.projectID
//   })
//     .then(response => {
//         Project.findByIdAndUpdate(req.body.projectID, { $push:{ tasks: response._id } })
//         .then(theResponse => {
//             res.json(theResponse);
//         })
//         .catch(err => {
//           res.json(err);
//       })
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })



// // update a task
// router.put('/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Task.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => {
//       res.json({ message: `Task with ${req.params.id} is updated successfully.` });
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })

// // DELETE route => to delete a specific task
// router.delete('/:id', (req, res, next)=>{

//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

//   Task.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.json({ message: `Task with ${req.params.id} is removed successfully.` });
//     })
//     .catch(err => {
//       res.json(err);
//     })
// })




// module.exports = router;