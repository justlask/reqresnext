import React, { Component } from 'react';
import AuthService from './AuthService';
import Button from '../Button'
import { Link } from 'react-router-dom'
import FlashMessage from '../FlashMessage';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '', flash: false};
    this.service = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    
    this.service.login(email, password)
    .then( response => {
        this.setState({ email: "", password: "" });
        this.props.getUser(response)
        this.props.history.push('/dashboard')
    })
    .catch(error => {
      this.handleFlash('email or password is incorrect');
    } )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  handleFlash = (message) => {
    this.setState({
      flash: !this.state.flash,
      message: message
    })
    setTimeout(() => this.cancelFlash(), 4000)
  }

  cancelFlash = () => {
    this.setState({
      flash: !this.state.flash
    })
  }

    
  render(){
    return(
      <div className="signup">
        <div>
          <h1>Let's get back to work.</h1>
          <p>These projects aren't going to finish themselves.</p>
        </div>
        <form className="signupform">
          <h1>Login</h1>
          <label>Email*</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)} required/>
          <label>Password*</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} required/>
          <FlashMessage thestyle='flashemail' show={this.state.flash} message={this.state.message} />
          <div className="loginbtns">
            <Link to="/forgot">Forgot password?</Link>
            <Button title="login" className="signupbtn" onClick={(e) => this.handleFormSubmit(e)}/>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;