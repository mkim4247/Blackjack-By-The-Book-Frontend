import React from 'react'
import { connect } from 'react-redux'
import { creatingNewUser } from '../redux/actions'
import Nav from './Nav'
import { NavLink } from 'react-router-dom'

class Create extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }

  handleChange = event => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.creatingNewUser(this.state)
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
              Create Account:
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
                  <button onClick={this.handleSubmit}>
                    Submit
                  </button>
                </div>
                <div>
                  OR
                </div>
                <div style={{padding: '10px'}}>
                  <NavLink to='/login'>
                    BACK TO LOGIN
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { creatingNewUser })(Create)
