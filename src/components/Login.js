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
        <div>

      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'> Username: </label>
        <input type='text' name='username' onChange={this.handleChange}/>

        <label htmlFor='password'> Password: </label>
        <input type='password' name='password' onChange={this.handleChange}/>

        <input type='submit'/>
      </form>
      </div>
    </div>
    )
  }

}

export default connect(null, { settingUser })(Login)
