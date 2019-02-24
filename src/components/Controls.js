import React from 'react'

import { connect } from 'react-redux'
import { dealingCards, hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, takeInsurance, passInsurance } from '../redux/actions'

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

  showSplit = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button onClick={this.props.splittingPlayerCards}> Split </button>
      )
    }
  }

  render(){
    return(
      <div id='controls'>
      Controls
      {this.props.bet > 0 && this.props.roundResult !== "Deal" ?
        <button onClick={this.props.dealingCards}>Deal</button>
        :
        <div> Place your bets </div>
      }
      {
        !this.props.showDealer && this.props.roundResult === "Deal" ?
        <div>
          {this.showHitAndStay()}
          {this.showDouble()}
          {this.showSplit()}

        {
          this.props.insurance === 'ask' ?
            <div>
              <button onClick={this.props.takeInsurance}> Take Insurance </button>
              <button onClick={this.props.passInsurance}> Pass Insurance </button>
            </div>
            : null
        }
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
    playerAction: state.playerAction,
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
    passInsurance: () => dispatch(passInsurance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
