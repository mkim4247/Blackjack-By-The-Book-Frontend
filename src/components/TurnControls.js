import React from 'react'
import { connect } from 'react-redux'
import { hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, takeInsurance, passInsurance } from '../redux/actions'

class TurnControls extends React.Component {
  showHitAndStay = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <span>
          <button
            className='control-btns'
            onClick={this.props.hittingPlayerCards}>
              Hit
          </button>
          <button
            className='control-btns'
            onClick={this.props.playerStay}>
              Stay
          </button>
        </span>
      )
    }
  }

  showDouble = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2 && this.props.playerHand[this.props.index].bet <= this.props.user.pot){
      return (
        <button
          className='control-btns'
          onClick={this.props.doublingPlayer}>
            Double
        </button>
      )
    }
  }

  showSplit = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2 && this.props.playerHand[this.props.index].bet <= this.props.user.pot){
      if(this.props.playerHand[this.props.index].cards[0].value === this.props.playerHand[this.props.index].cards[1].value || (this.props.playerHand[this.props.index].score === 20 && !this.props.playerHand[this.props.index].cards.find( card => card.value === "ACE"))
      ){
        return (
          <button
            className='control-btns'
            onClick={this.props.splittingPlayerCards}>
              Split
          </button>
        )
      }
    }
  }

  render(){
    return(
      <div id='controls'>
        {!this.props.showDealer && this.props.roundResult === "Deal" && this.props.insurance !== "ask" ?
          <span>
            {this.showDouble()}
            {this.showHitAndStay()}
            {this.showSplit()}
          </span>
        : null
        }
        {this.props.insurance === 'ask' ?
          <div>
            <div className='insurance-box'>
              Take Insurance for ${Math.ceil(this.props.bet/2)} ?
            </div>
            <div className='btns-div'>
              <button
                className='control-btns'
                onClick={this.props.takeInsurance}>
                  Take
              </button>
              <button
                className='control-btns'
                onClick={this.props.passInsurance}>
                  Pass
              </button>
            </div>
          </div>
          : null
        }
        {!this.props.gameOver && this.props.bet === 0 ?
          <div className='insurance-box'>
            Place Bet
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
    index: state.currentHandIndex,
    bet: state.bet,
    showDealer: state.showDealer,
    insurance: state.insurance,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hittingPlayerCards: () => dispatch(hittingPlayerCards()),
    playerStay: () => dispatch(playerStay()),
    doublingPlayer: () => dispatch(doublingPlayer()),
    splittingPlayerCards: () => dispatch(splittingPlayerCards()),
    takeInsurance: () => dispatch(takeInsurance()),
    passInsurance: () => dispatch(passInsurance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnControls)
