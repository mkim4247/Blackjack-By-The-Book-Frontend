import React from 'react'
import { connect } from 'react-redux'
import { placingBet } from '../redux/actions'

class Pot extends React.Component {

  // totalPot = () => {
  //   return this.props.playerHand.reduce( (sum, hand) => {
  //     return sum + hand.bet
  //   }, 0)
  // }

  decBetButtons = () => {
    if(this.props.bet >= 50){
      return (
      <div>
      <button onClick={() => this.props.placingBet(-50)}> Dec 50 </button>
      <button onClick={() => this.props.placingBet(-25)}> Dec 25 </button>
      <button onClick={() => this.props.placingBet(-10)}> Dec 10 </button>
      <button onClick={() => this.props.placingBet(-5)}> Dec 5 </button>
      </div>
      )
    } else if(this.props.bet >= 25 && this.props.bet < 50){
      return (
      <div>
      <button onClick={() => this.props.placingBet(-25)}> Dec 25 </button>
      <button onClick={() => this.props.placingBet(-10)}> Dec 10 </button>
      <button onClick={() => this.props.placingBet(-5)}> Dec 5 </button>
      </div>
      )
    } else if(this.props.bet >= 10 && this.props.bet < 25){
      return (
      <div>
      <button onClick={() => this.props.placingBet(-10)}> Dec 10 </button>
      <button onClick={() => this.props.placingBet(-5)}> Dec 5 </button>
      </div>
      )
    }
    else if(this.props.bet >= 5){
      return (
        <div>
        <button onClick={() => this.props.placingBet(-5)}> Dec 5 </button>
      </div>
      )
    }
  }

  render(){
    return(
      <div>
        <div>
          {this.props.bet}
        </div>
        {this.decBetButtons()}
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

export default connect(mapStateToProps, { placingBet })(Pot)
