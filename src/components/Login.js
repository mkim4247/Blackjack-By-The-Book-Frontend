import React from 'react'
import { connect } from 'react-redux'
import { settingUser } from '../redux/actions'

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
        <div id='inner-login'>
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
    )
  }

}

export default connect(null, { settingUser })(Login)
