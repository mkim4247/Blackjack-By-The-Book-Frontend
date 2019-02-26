import React from 'react'
import PlayerHand from './PlayerHand'

import { connect } from 'react-redux'

class PlayerContainer extends React.Component {

  render(){
    return(
      <div>
      Player Container
      {this.props.playerHand[0].cards.length > 0 ?
        this.props.playerHand.map( (hand, index) => {
          return <PlayerHand hand={hand} key={index} />
        })
        : null
      }
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
