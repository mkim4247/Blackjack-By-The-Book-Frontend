import React from 'react'
import DealerHand from './DealerHand'
import { connect } from 'react-redux'

class DealerContainer extends React.Component {

  render(){
    return(
      <div>
      Dealer Container
      <DealerHand />
        {this.props.showDealer ?
          <div> {this.props.dealerHand.score} </div>
          : null
        }
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
