import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import { connect } from 'react-redux'
import { dealingPlayerCards, dealingDealerCards } from '../redux/actions'

class TableContainer extends React.Component {

  dealCards = event => {
    this.props.dealingDealerCards()
    this.props.dealingDealerCards()
  }

  render(){
    return(
      <div>
      Table Container
      <DealerContainer />
      <button onClick={this.dealCards}>Deal</button>
      <PlayerContainer />
      </div>
    )
  }
}

export default connect(null, {dealingPlayerCards, dealingDealerCards})(TableContainer)
