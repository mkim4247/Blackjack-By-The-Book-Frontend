import React from 'react'
import PlayerHand from './PlayerHand'

import { connect } from 'react-redux'

class PlayerContainer extends React.Component {

  render(){
    return(
      <div>
      Player Container
      {this.props.playerHand.map( (hand, index) => {
        return <PlayerHand hand={hand} key={index} />
      })}
      {this.props.user.pot}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playerHand: state.playerHand,
    user: state.user
  }
}

export default connect(mapStateToProps)(PlayerContainer)
