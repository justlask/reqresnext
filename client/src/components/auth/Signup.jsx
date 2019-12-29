
import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import Button from '../Button'

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = { name: '', email: '', password: '' };
    this.service = new AuthService();
  }

  // handleChange() and handleSubmit() will be added here
  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const email = this.state.email;
    const password = this.state.password
  
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
  
  handleChange = (event) => {  
    console.log(this.state)
    const {name, value} = event.target;
    this.setState({[name]: value});
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
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={ e => this.handleChange(e)}/>
          <label>Email</label>
          <input type="text" name="email" value={this.state.email} onChange={ e => this.handleChange(e)}/>
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={ e => this.handleChange(e)} />
          <Button title="join" className="signupbtn" onClick={this.handleFormSubmit}/>
          {/* <input type="submit" className="signupbtn" value="Signup" /> */}
        </form>
    </div>
    )
  }
}

export default Signup;