const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User    = require('../models/user-model');
const Project = require('../models/projects-model');
const Task    = require('../models/tasks-model');
const Teams   = require('../models/teams-model');
const Actions = require('../models/actions-model');
const Comment = require('../models/comment-model')

const bcryptSalt = 10

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });



// let teams = [
//   {
//     name: 'Bebe Yoda',
//     admin: '5e09076dd36b873533f3ee8e',
//     members: ['5e09076dd36b873533f3ee8e'],
//     // projects: [{ type : Schema.Types.ObjectId, ref: 'Projects' }]
//   }
// ]


// Teams.deleteMany()
//   .then(() => {
//     return Teams.create(teams)
//   })
//   .then(teamsCreated => {
//     console.log(`${teamsCreated.length} users created with the following id:`)
//     console.log(teamsCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })


let projects = [
  {
    title: 'ReqResNext',
    image: 'https://www.sketchappsources.com/resources/source-image/web-wireframe-anishtalwar.png',
    description: 'ReqResNext is a project management platform for solo devs.',
    // actions: [[{type: Schema.Types.ObjectId, ref: 'Action'}]],
    // tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    owner: '5e09076dd36b873533f3ee8e',
    members: ['5e09076dd36b873533f3ee8e'],
    team: '5e091b1102aae73925ae42f9',
    complete: false
  },
  {
    title: 'DOSTED',
    image: 'https://www.sketchappsources.com/resources/source-image/web-wireframe-anishtalwar.png',
    description: 'Change the world by doing one small thing every day.',
    // actions: [[{type: Schema.Types.ObjectId, ref: 'Action'}]],
    // tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    owner: '5e09076dd36b873533f3ee8e',
    members: ['5e09076dd36b873533f3ee8e'],
    team: '5e091b1102aae73925ae42f9',
    complete: false
  }
]


// Project.deleteMany()
//   .then(() => {
//     return Project.create(projects)
//   })
//   .then(projectsCreated => {
//     console.log(`${projectsCreated.length} users created with the following id:`)
//     console.log(projectsCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })



let actions = [
  {
    title: 'Signup',
    image: 'https://www.sketchappsources.com/resources/source-image/web-wireframe-anishtalwar.png',
    description: 'Must be able to signup to our website with a form, and have the data be sent to the backend',
    // tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    members: ['5e09076dd36b873533f3ee8e'],
    creator: '5e09076dd36b873533f3ee8e',
    team: '5e091b1102aae73925ae42f9',
    complete: false,
    project: '5e091bb44cb4d23985fbc72f'
  },
  {
    title: 'Signup',
    image: 'https://www.sketchappsources.com/resources/source-image/web-wireframe-anishtalwar.png',
    description: 'Must be able to signup to our website with a form, and have the data be sent to the backend',
    // tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    members: ['5e09076dd36b873533f3ee8e'],
    creator: '5e09076dd36b873533f3ee8e',
    team: '5e091b1102aae73925ae42f9',
    complete: false,
    project: '5e091bb44cb4d23985fbc730'
  },
]





// Actions.deleteMany()
//   .then(() => {
//     return Actions.create(actions)
//   })
//   .then(actionsCreated => {
//     console.log(`${actionsCreated.length} users created with the following id:`)
//     console.log(actionsCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })




//5e091b1102aae73925ae42f9 bebe yoda
//5e09076dd36b873533f3ee8e justlask

//5e091bb44cb4d23985fbc72f reqresnext
//5e091cd190dc6f39e92cbb39 signup action reqresnext


// 5e091bb44cb4d23985fbc730 dosted
//5e091cd190dc6f39e92cbb3a signup action dosted



/*
DOSTED
5e0920bf49e5423a841e6ebb
5e0920bf49e5423a841e6eb7
5e0920bf49e5423a841e6eb8
5e0920bf49e5423a841e6eba


ReqResNext
5e0920bf49e5423a841e6eb5
5e0920bf49e5423a841e6eb6
5e0920bf49e5423a841e6eb9

*/



let tasks = [
  {
    title: 'Create React Component for Signup',
    // description: String,
    project: '5e091bb44cb4d23985fbc72f',
    owner: '5e09076dd36b873533f3ee8e',
    type: "front-end",
    complete: false,
    action: '5e091cd190dc6f39e92cbb39',
    team: '5e091b1102aae73925ae42f9',
  },
  {
    title: 'Create handlers to pass information from front-end to back-end',
    // description: String,
    project: '5e091bb44cb4d23985fbc72f',
    owner: '5e09076dd36b873533f3ee8e',
    type: "front-end",
    complete: false,
    action: '5e091cd190dc6f39e92cbb39',
    team: '5e091b1102aae73925ae42f9',
  },
  {
    title: 'Create React Component for Signup',
    // description: String,
    project: '5e091bb44cb4d23985fbc730',
    owner: '5e09076dd36b873533f3ee8e',
    type: "front-end",
    complete: false,
    action: '5e091cd190dc6f39e92cbb3a',
    team: '5e091b1102aae73925ae42f9',
  },
  {
    title: 'Create handlers to pass information from front-end to back-end',
    // description: String,
    project: '5e091bb44cb4d23985fbc730',
    owner: '5e09076dd36b873533f3ee8e',
    type: "front-end",
    complete: false,
    action: '5e091cd190dc6f39e92cbb3a',
    team: '5e091b1102aae73925ae42f9',
  },
  {
    title: 'Create User Model',
    // description: String,
    project: '5e091bb44cb4d23985fbc72f',
    owner: '5e09076dd36b873533f3ee8e',
    type: "back-end",
    complete: false,
    action: '5e091cd190dc6f39e92cbb39',
    team: '5e091b1102aae73925ae42f9',
  },
  {
    title: 'Modify User Model',
    // description: String,
    project: '5e091bb44cb4d23985fbc730',
    owner: '5e09076dd36b873533f3ee8e',
    type: "back-end",
    complete: false,
    action: '5e091cd190dc6f39e92cbb3a',
    team: '5e091b1102aae73925ae42f9',
  }, 
  {
    title: 'Does not reroute after signup',
    // description: String,
    project: '5e091bb44cb4d23985fbc730',
    owner: '5e09076dd36b873533f3ee8e',
    type: "bug",
    complete: false,
    action: '5e091cd190dc6f39e92cbb3a',
    team: '5e091b1102aae73925ae42f9',
  }
]


// Task.deleteMany()
//   .then(() => {
//     return Task.create(tasks)
//   })
//   .then(tasksCreated => {
//     console.log(`${tasksCreated.length} users created with the following id:`)
//     console.log(tasksCreated.map(u => u._id))
//   })
//   .then(() => {
//     // Close properly the connection to Mongoose
//     mongoose.disconnect()
//   })
//   .catch(err => {
//     mongoose.disconnect()
//     throw err
//   })