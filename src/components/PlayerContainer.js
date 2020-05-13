import React from 'react'
import PlayerHand from './PlayerHand'
import { connect } from 'react-redux'

const PlayerContainer = props => {
  return(
    <span id='player-container'>
      {props.playerHand[0].cards.length > 0 ?
        props.playerHand.map( (hand, index) => {
          return <PlayerHand hand={hand} key={index} />
          }
        )
        : null
      }
    </span>
  )
}

const mapStateToProps = state => {
  return {
    playerHand: state.playerHand,
    user: state.user
  }
}

export default connect(mapStateToProps)(PlayerContainer)
