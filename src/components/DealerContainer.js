import React from 'react'
import DealerHand from './DealerHand'
import { connect } from 'react-redux'

class DealerContainer extends React.Component {

  render(){
    return(
      <div>
      Dealer Container
      <DealerHand dealerHand={this.props.dealerHand}/>
        <div> {this.props.dealerHand.score} </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dealerHand: state.dealerHand,
    dealerScore: state.dealerScore
  }
}

export default connect(mapStateToProps)(DealerContainer)
