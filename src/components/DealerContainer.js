import React from 'react'
import { connect } from 'react-redux'
import DealerHand from './DealerHand'

class DealerContainer extends React.Component {

  render(){
    return(
      <div id='dealer-container'>
      <DealerHand />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dealerHand: state.dealerHand,
    showDealer: state.showDealer
  }
}

export default connect(mapStateToProps)(DealerContainer)
