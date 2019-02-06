import React from 'react'
import { connect } from 'react-redux'
import { creatingNewUser } from '../redux/actions'

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
    this.props.settingUser(this.state)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='name'> Username: </label>
        <input type='text' name='username' onChange={this.handleChange}/>

        <label htmlFor='password'> Password: </label>
        <input type='password' name='password' onChange={this.handleChange}/>

        <input type='submit'/>
      </form>
    )
  }
}

export default connect(null, { creatingNewUser })(Create)
