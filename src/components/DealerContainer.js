import React from 'react'
import DealerHand from './DealerHand'
import { connect } from 'react-redux'

class DealerContainer extends React.Component {

  render(){
    return(
      <div>
      Dealer Container
      <DealerHand cards={this.props.cards}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { cards: state.dealerHand}
}

export default connect(mapStateToProps)(DealerContainer)
