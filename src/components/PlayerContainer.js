import React from 'react'
import PlayerHand from './PlayerHand'

import { connect } from 'react-redux'

class PlayerContainer extends React.Component {

  render(){
    return(
      <div>
      Player Container
      <PlayerHand cards={this.props.cards}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { cards: state.playerHand }
}

export default connect(mapStateToProps)(PlayerContainer)
