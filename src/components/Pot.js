import React from 'react'
import { connect } from 'react-redux'
import { placeBet } from '../redux/actions'

class Pot extends React.Component {

  // totalPot = () => {
  //   return this.props.playerHand.reduce( (sum, hand) => {
  //     return sum + hand.bet
  //   }, 0)
  // }

  render(){
    return(
      <div onClick={() => this.props.placeBet(-5)} style={{border: '1px solid red'}}> Decrease Bet
        <div>
          {this.props.bet}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // playerHand: state.playerHand
    bet: state.bet
  }
}

export default connect(mapStateToProps, { placeBet })(Pot)
