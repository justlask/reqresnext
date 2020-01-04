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

  createAction = (projectID, actionInfo) => {
    return this.service.post(`/action/${projectID}/addaction`, actionInfo)
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

  
}

export default AuthService;