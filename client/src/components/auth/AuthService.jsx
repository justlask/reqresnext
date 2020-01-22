import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (name, email, password) => {
    return this.service.post('/auth/signup', {name, email, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/auth/loggedin')
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/auth/login', {email, password})
    .then(response => response.data)
  }
  
  logout = () => {
    return this.service.post('/auth/logout', {})
    .then(response => response.data)
  }

  getUserInfo = () => {
    return this.service.get('/user/getuserinfo')
    .then(response => response.data)
  }

  getProjects = (select, userID) => {
    return this.service.post('/user/projects', {select, userID})
    .then(response => response.data)
  }

  getProjectsByTeam = (select, userID) => {
    return this.service.post('/user/projectsbyteam', {select, userID})
    .then(response => response.data)
  }


  getProject = (projectID) => {
    return this.service.get(`/project/${projectID}`)
    .then(response => response.data)
  }

  calculatePercent = (projectID) => {
    return this.service.get(`/project/calculatestatus/${projectID}`)
    .then(response => response.data)
  }


  getAction = (actionID) => {
    return this.service.get(`/action/${actionID}`)
    .then(response => response.data)
  }

  createAction = (projectID, actionInfo, image) => {
    return this.service.post(`/action/${projectID}/addaction`, {actionInfo, image})
    .then(response => response.data)
  }

  completeTask = (taskID) => {
    return this.service.post(`/task/complete/${taskID}`, taskID)
    .then(response => response.data)
  }

  addTask = (actionID, taskInfo) => {
    return this.service.post(`/task/addtask/${actionID}`, taskInfo)
    .then(response => response.data)
  }

  addTaskComment = (projectID, actionID, taskID, commentInfo) => {
    return this.service.post(`/comment/add/${projectID}/${actionID}/${taskID}`, commentInfo)
    .then(response => response.data)
  }


  getTasks = (actionID, type) => {
    return this.service.get(`/task/${actionID}/${type}`)
    .then(response => response.data)
  }

  getComments = (taskID) => {
    return this.service.get(`/comment/${taskID}`)
    .then(response => response.data)
  }

  handleUpload (theFile) {
    return this.service.post('/user/upload', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  updateAccount = (userInfo) => {
    return this.service.post(`/user/editprofile`, userInfo)
    .then(response => response.data)
  }

  handleProjectUploadMainImage (theFile) {
    return this.service.post('/project/upload/mainimage', theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  createProject = (projectInfo) => {
    return this.service.post('/project/create', projectInfo)
    .then(response => response.data)
  }

  resetPassword = (email) => {
    return this.service.post(`/auth/resetpassword`, {email})
    .then(response => response.data)
  }

  deleteAccount = (userPass) => {
    return this.service.post('/user/deleteaccount', userPass)
    .then(response => response.data)
  }

  contact = (name, email, message) => {
    return this.service.post('/user/contact', {name, email, message})
    .then(response => response.data)
  }

  updateAction = (actionID, actionInfo, image) => {
    return this.service.post('/action/update', {actionID, actionInfo, image})
    .then(response => response.data)
  }

  updateProject = (projectID, projectInfo, image) => {
    return this.service.post('/project/update', {projectID, projectInfo, image})
    .then(response => response.data)
  }

  deleteAction = (actionID, projectID) => {
    return this.service.post(`/action/delete/${projectID}/${actionID}`)
    .then(response => response.data)
  }

  markActionComplete = (actionID) => {
    return this.service.post(`/action/markcomplete/${actionID}`)
    .then(response => response.data)
  }

  markActionIncomplete = (actionID) => {
    return this.service.post(`/action/markincomplete/${actionID}`)
    .then(response => response.data)
  }

  deleteProject = (projectID) => {
    return this.service.post(`/project/delete/${projectID}`)
    .then(response => response.data)
  }

  markProjectComplete = (projectID) => {
    return this.service.post(`/project/markcomplete/${projectID}`)
    .then(response => response.data)
  }

  markProjectIncomplete = (projectID) => {
    return this.service.post(`/project/markincomplete/${projectID}`)
    .then(response => response.data)
  }

  getTeams = () => {
    return this.service.get('/getmyteams')
    .then(response => response.data)
  }

  createTeam = (team) => {
    return this.service.post('/team/create', team)
    .then(response => response.data)
  }

  sendInvite = (team, email) => {
    return this.service.post('/team/sendinvite', {team, email})
    .then(response => response.data)
  }
}

export default AuthService;