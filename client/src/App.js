import React, { useState, useEffect } from 'react';
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
import ProtectedRoute from './components/auth/protectedRoute';
import SignupReferral from './components/auth/SignupReferral';


const App = () => {
  const service = new AuthService();
  const [user, updateUser] = useState(null);

  const fetchUser = () => {
    if (user === null) {
      service.loggedin()
      .then(response => {
        updateUser(response)
      })
      .catch(err => {
        updateUser(false)
      })
    }
  }

  const logoutUser = () => {
    service.logout()
    .then(data => {
      updateUser(null)
    })
  }

  useEffect(() => {
    fetchUser()
  }, []);

  return (
    <div className="App">
      <Navbar user={user} updateUser={updateUser} logoutUser={logoutUser} />
        <Switch> 
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/about" render={(props) => <AboutUs {...props} />}></Route>
          <Route exact path="/blog" render={(props) => <Blog {...props} />}></Route>
          <Route exact path="/contact" render={(props) => <ContactForm {...props} />} ></Route>
          <Route exact path='/signup' render={(props) => <Signup {...props} getUser={updateUser}/>}/>
          <Route exact path='/login' render={(props) => <Login {...props} getUser={updateUser}/>}/>
          <Route exact path="/forgot" render={(props) => <PasswordReset {...props} />}></Route>
          <ProtectedRoute user={user} path='/dashboard' component={Dashboard} />
          <ProtectedRoute user={user} path='/project/:projectID/:actionID' component={Action} />
          <ProtectedRoute user={user} path='/project/:id' component={Project} />
          <ProtectedRoute user={user} path='/account' component={Profile} />
          <Route path="/join/:teamID/:confirmationCode" render={(props) => <SignupReferral {...props} getUser={updateUser} />}></Route>
          <Redirect to="/" />
        </Switch>
      <Footer />
    </div>
  )
}


export default App;