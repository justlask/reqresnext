import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AuthService from './components/auth/AuthService';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import NewProject from './components/projects/NewProject'
import Project from './components/projects/Project'
import Action from './components/actions/Action'
import Profile from './components/account/Profile';
import AboutUs from './components/about/AboutUs'
import Blog from './components/blog/Blog'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    {this.fetchUser()}
    return (
      <div className="App">
        <Navbar  user={this.state.loggedInUser} updateUser={this.getTheUser} />
          <Switch> 
            <Route exact path="/" render={() => <Home />} />
            <Route exact path='/signup' render={(props) => <Signup {...props} getUser={this.getTheUser}/>}/>
            <Route exact path='/login' render={(props) => <Login {...props} getUser={this.getTheUser}/>}/>
            <Route exact path='/dashboard' render={(props) => <Dashboard {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser}/>}/>
            <Route exact path="/newproject" render={(props) => <NewProject {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser}/>} />
            <Route exact path="/project/:id" render={(props) => <Project {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser} /> } />
            <Route exact path="/project/:projectID/:actionID" render={(props) => <Action {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser} /> }></Route>
            <Route exact path="/account" render={(props) => <Profile {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser} />} ></Route>
            <Route exact path="/about" render={(props) => <AboutUs />}></Route>
            <Route exact path="/blog" render={(props) => <Blog />}></Route>
            {/* <ProtectedRoute user={this.state.loggedInUser} path='/projects/:id' component={ProjectDetails} />
            <ProtectedRoute user={this.state.loggedInUser} path='/projects' component={ProjectList} /> */}
          </Switch>
        <Footer />
      </div>
    )
  }}


export default App;