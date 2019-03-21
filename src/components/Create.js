import React from 'react'
import { connect } from 'react-redux'
import { creatingNewUser } from '../redux/actions'
import Nav from './Nav'

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
      <div>
        <Nav />
      <div id='login'>
        <h1> BLACKJACK </h1>
        <div id='inner-login'>
          <h2>
            Create Account:
          </h2>
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
                <button onClick={this.handleSubmit}> Submit </button>
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
