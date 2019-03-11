import React from 'react'
import { connect } from 'react-redux'
import { hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, takeInsurance, passInsurance } from '../redux/actions'

class Controls extends React.Component {

  showHitAndStay = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <span>
          <button className='hit-stay-btns'  onClick={this.props.hittingPlayerCards}>Hit</button>
          <button className='hit-stay-btns' onClick={this.props.playerStay}>Stay</button>
        </span>
      )
    }
  }

  showDouble = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button className='control-btns'  onClick={this.props.doublingPlayer}>Double</button>
      )
    }
  }

  showSplit = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      if(this.props.playerHand[this.props.index].cards[0].value === this.props.playerHand[this.props.index].cards[1].value || this.props.playerHand[this.props.index].score === 20
      ){
        return (
          <button className='control-btns' onClick={this.props.splittingPlayerCards}> Split </button>
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

            <button className='control-btns' onClick={this.props.splittingPlayerCards}> Split </button>
          </span>
        : null
        }
        {this.props.insurance === 'LOST' || this.props.insurance === 'WON' ?
          <div className='insurance-box'> Insurance {this.props.insurance} </div>
          : null
        }
        {this.props.insurance === 'ask' ?
          <div className='insurance-box'>
            Take Insurance?
            <div className='insurance-box'>
              This will cost {this.props.bet/2}.
            </div>
            <button className='control-btns' onClick={this.props.takeInsurance}> Take </button>
            <button className='control-btns' onClick={this.props.passInsurance}> Pass </button>
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
    insurance: state.insurance
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

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
