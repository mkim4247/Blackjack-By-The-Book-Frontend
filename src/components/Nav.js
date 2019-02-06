import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions'

class Nav extends React.Component {
  logout = () => {
    this.props.setUser(null)
    localStorage.clear()
  }

  render(){
    return(
      <button onClick={this.logout}> Logout </button>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(Nav)
