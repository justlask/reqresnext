import React, { Component } from 'react';
import AuthService from './AuthService';
import Button from '../Button'
import FlashMessage from '../FlashMessage'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { name: '',
    email: '',
    password: '',
    flash: false,
    message: ''
    };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password
  
    if (email.includes('@') && email.includes('.')) {
      this.service.signup(name, email, password)
      .then( response => {
          this.setState({
              name: "",
              email: "",
              password: "",
          });
          this.props.getUser(response)
          this.props.history.push('/dashboard')
      })
      .catch( error => console.log(error) )
    }
    else {
      console.log('email must be in email format.')
      this.handleFlash('email must be a valid email');
    }
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
      // more code will be added here
      <div className="signup">
        <div>
          <h1>Let's get started.</h1>
          <p>These projects aren't going to start and organize themselves.</p>
        </div>
        <form className="signupform">
          <h1>Signup</h1>
          <label>Name*</label>
          <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)} required/>
          <label>Email*</label>
          <input type="email" name="email" value={this.state.email} onChange={ e => this.handleChange(e)} required/>
          <label>Password*</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} required />
          <FlashMessage thestyle='flashemail' show={this.state.flash} message={this.state.message} />
          <Button title="join" className="signupbtn" onClick={this.handleFormSubmit}/>
        </form>
    </div>
    )
  }
}

export default Signup;