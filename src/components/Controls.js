import React from 'react'
import { connect } from 'react-redux'
import { dealingCards, hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, takeInsurance, passInsurance, surrenderingPlayer } from '../redux/actions'

class Controls extends React.Component {

  showHitAndStay = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <div>
          <button onClick={this.props.hittingPlayerCards}>Hit</button>
          <button onClick={this.props.playerStay}>Stay</button>
        </div>
      )
    }
  }

  showDouble = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button onClick={this.props.doublingPlayer}>Double</button>
      )
    }
  }

  /* need to handle splitting */

  showSplit = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button onClick={this.props.splittingPlayerCards}> Split </button>
      )
    }
  }

  showSurrender = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button onClick={this.props.surrenderingPlayer}> Surrender </button>
      )
    }
  }

  render(){
    return(
      <div id='controls'>
        {this.props.bet > 0 && this.props.roundResult !== "Deal" ?
          <button onClick={this.props.dealingCards}>Deal</button>
          :
          <div> Place your bets </div>
        }
        {
        !this.props.showDealer && this.props.roundResult === "Deal" && this.props.insurance !== 'ask'?
          <div>
            {this.showHitAndStay()}
            {this.showDouble()}
            {this.showSplit()}
            {this.showSurrender()}
          </div>
        : this.props.insurance === 'ask' ?
          <div>
            Take Insurance?
            <div>
              This will cost {this.props.bet/2}.
            </div>
            <button onClick={this.props.takeInsurance}> Take </button>
            <button onClick={this.props.passInsurance}> Pass </button>
          </div>
          : null
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playerHand: state.playerHand,
    roundResult: state.roundResult,
    insurance: state.insurance,
    index: state.currentHandIndex,
    bet: state.bet,
    showDealer: state.showDealer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dealingCards: () => dispatch(dealingCards()),
    hittingPlayerCards: () => dispatch(hittingPlayerCards()),
    playerStay: () => dispatch(playerStay()),
    doublingPlayer: () => dispatch(doublingPlayer()),
    splittingPlayerCards: () => dispatch(splittingPlayerCards()),
    takeInsurance: () => dispatch(takeInsurance()),
    passInsurance: () => dispatch(passInsurance()),
    surrenderingPlayer: () => dispatch(surrenderingPlayer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
