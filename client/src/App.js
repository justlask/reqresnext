import React, { Component } from 'react';
import './AppNew.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthService from './components/auth/AuthService';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Home from './components/home/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Project from './components/projects/Project';
import Action from './components/actions/Action';
import Profile from './components/account/Profile';
import AboutUs from './components/about/AboutUs';
import Blog from './components/blog/Blog';
import ContactForm from './components/contact/ContactForm';
import PasswordReset from './components/auth/PasswordReset';
import ProtectedRoute from './components/auth/protectedRoute'
import SignupReferral from './components/auth/SignupReferral'


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
    if (this.state.loggedInUser) {
      return (
      <div className="App">
        <Navbar user={this.state.loggedInUser} updateUser={this.getTheUser} />
          <Switch> 
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/about" render={(props) => <AboutUs {...props} />}></Route>
            <Route exact path="/blog" render={(props) => <Blog {...props} />}></Route>
            <Route exact path="/contact" render={(props) => <ContactForm {...props} />} ></Route>
            <ProtectedRoute user={this.state.loggedInUser} path='/dashboard' component={Dashboard} />
            <ProtectedRoute user={this.state.loggedInUser} path='/project/:projectID/:actionID' component={Action} />
            <ProtectedRoute user={this.state.loggedInUser} path='/project/:id' component={Project} />
            <ProtectedRoute user={this.state.loggedInUser} path='/account' component={Profile} />
            {/* <Route exact path='/dashboard' render={(props) => <Dashboard {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser}/>}/> */}
            {/* <Route exact path="/project/:projectID/:actionID" render={(props) => <Action {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser} /> }></Route> */}
            {/* <Route exact path="/project/:id" render={(props) => <Project {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser} /> } /> */}
            {/* <Route exact path="/account" render={(props) => <Profile {...props} user={this.state.loggedInUser} getUser={this.state.getTheUser} />} ></Route> */}
            <Redirect to="/" />
          </Switch>
        <Footer />
      </div>
    )
    }
    else {
      return (
        <div className="App">
          <Navbar user={this.state.loggedInUser} updateUser={this.getTheUser} />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path='/signup' render={(props) => <Signup {...props} getUser={this.getTheUser}/>}/>
            <Route exact path='/login' render={(props) => <Login {...props} getUser={this.getTheUser}/>}/>
            <Route exact path="/about" render={(props) => <AboutUs {...props} />}></Route>
            <Route exact path="/blog" render={(props) => <Blog {...props} />}></Route>
            <Route exact path="/contact" render={(props) => <ContactForm {...props} />} ></Route>
            <Route exact path="/forgot" render={(props) => <PasswordReset {...props} />}></Route>
            <Route path="/join/:teamID/:confirmationCode" render={(props) => <SignupReferral {...props} getUser={this.getTheUser} />}></Route>
            <Redirect to="/" />
          </Switch>
          <Footer />
        </div>
      )
    }
  }}


export default App;