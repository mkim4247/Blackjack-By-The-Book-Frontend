import React from 'react'
import { connect } from 'react-redux'

class Stats extends React.Component {
  render(){
    return(
      <div id='stats-box'>
        {this.props.user.username.toUpperCase()}
        <hr/>
          <div>
            Pot: {this.props.user.pot}
          </div>
          <div>
            Streak: {this.props.user.current_streak}
          </div>
        <hr/>
        <div>
          Longest Streak: {this.props.user.longest_streak}
        </div>
        <div>
          Largest Pot: {this.props.user.largest_pot}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Stats)
