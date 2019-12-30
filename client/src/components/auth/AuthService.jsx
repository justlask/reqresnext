import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
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

}

export default AuthService;