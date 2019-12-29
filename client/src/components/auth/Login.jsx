import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import Button from '../Button'

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { email: '', password: '' };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.service.login(email, password)
    .then( response => {
        this.setState({ email: "", password: "" });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }
    
  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
    
  render(){
    return(
      <main className="signup">
        <div>
          <h1>Let's get back to work.</h1>
          <p>These projects aren't going to finish themselves.</p>
        </div>
        <form className="signupform">
          <h1>Login</h1>
          <label>Email</label>
          <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          
          {/* <input type="submit" value="Login" /> */}
          <Button title="login" className="signupbtn" onClick={(e) => this.handleFormSubmit()}/>
        </form>
      </main>
    )
  }
}

export default Login;