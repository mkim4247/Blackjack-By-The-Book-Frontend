import React from 'react'

import { connect } from 'react-redux'
import { dealingCards, hittingPlayerCards } from '../redux/actions'


class Controls extends React.Component {

  dealCards = event => {
    this.props.dealingCards()
  }

  hitPlayer = event => {
    this.props.hittingPlayerCards()
  }

  doublePlayer = event => {
    this.props.hittingPlayerCards()
  }

  render(){
    return(
      <div>
      Controls
      <button onClick={this.dealCards}>Deal</button>
      <button onClick={this.hitPlayer}>Hit</button>
      </div>
    )
  }
}

export default connect(null, {dealingCards, hittingPlayerCards})(Controls)
