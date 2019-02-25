import React from 'react'
import { connect } from 'react-redux'

class Stats extends React.Component {
  render(){
    return(
      <div>
        {this.props.user.username}
        <div>
          Longest Streak: {this.props.user.longest_streak}
        </div>
        <div>
          Largest Pot: {this.props.user.largest_pot}
        </div>
        <hr/>

        <div>
          Pot: {this.props.user.pot}
        </div>
        <div>
          Current Streak: {this.props.user.current_streak}
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