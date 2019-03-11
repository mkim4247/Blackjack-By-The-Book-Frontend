import React from 'react'
import { connect } from 'react-redux'

class Footer extends React.Component {
  render(){
    return(
      <div id='footer-bar'>
        <div> {this.props.user.username} </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Footer)
