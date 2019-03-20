import React from 'react'
import { connect } from 'react-redux'
import { settingUser, guestLogin } from '../redux/actions'
import { NavLink } from 'react-router-dom'

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.settingUser(this.state)
  }

  render(){
    return(
      <div id='login'>
        <h1> BLACKJACK </h1>
        <div id='login-parent'>
          <h2>
            Login:
          </h2>
          <div id='upper-login-div'>
            <form id='login-form' onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='name'> Username: </label>
                <br/>
                <input type='text' name='username' onChange={this.handleChange}/>
              </div>
              <div>
                <label htmlFor='password'> Password: </label>
                <br/>
                <input type='password' name='password' onChange={this.handleChange}/>
              </div>
              <div>
                <button onClick={this.handleSubmit}> Login </button>
              </div>
            </form>
          </div>
        </div>

        <div id='lower-login-div'>
          <button onClick={this.props.guestLogin}>
            PLAY AS GUEST
          </button>
          <span>
            OR
          </span>
          <NavLink to='/new'>
            CREATE ACCOUNT
          </NavLink>
        </div>


      </div>
    )
  }

}

export default connect(null, { settingUser, guestLogin })(Login)
