import React from 'react'
import { connect } from 'react-redux'
import { settingUser, guestLogin } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import Nav from './Nav'
import PropTypes from 'prop-types';

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
      <div>
        <Nav />
        <div id='login'>
          <div id='login-title'>
            <div>
              BLACKJACK
            </div>

            <div style={{fontSize: '400%'}}>
              By the Book
            </div>
          </div>
          <div id='inner-login'>
            <h3>
              Login:
            </h3>
            <div id='upper-login'>
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
                <div>
                  OR
                </div>
                <div style={{padding: '10px'}}>
                  <NavLink to='/new'>
                    CREATE ACCOUNT
                  </NavLink>
                </div>
              </form>
            </div>
          </div>

          <div id='lower-login'>
            <div id='inner-lower'>
              <div>
                SIGN IN AS GUEST
              </div>
              <span onClick={this.props.guestLogin}>
                PLAY
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { settingUser, guestLogin })(Login)


Login.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

Login.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
