import React from 'react'
import { connect } from 'react-redux'
import { hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, surrenderingPlayer } from '../redux/actions'

class Controls extends React.Component {

  showHitAndStay = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <div>
          <button className='control-btns'  onClick={this.props.hittingPlayerCards}>Hit</button>
          <button className='control-btns' onClick={this.props.playerStay}>Stay</button>
        </div>
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

  /* need to handle splitting */

  showSplit = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button className='control-btns' onClick={this.props.splittingPlayerCards}> Split </button>
      )
    }
  }

  /* can only surrender on initial deal (not after splitting) */
  /* NOT SHOWING UP RIGHT */

  showSurrender = () => {
    if(this.props.playerHand.length < 2 && this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2){
      return (
        <button className='control-btns' onClick={this.props.surrenderingPlayer}> Surrender </button>
      )
    }
  }

  render(){
    return(
      <div id='controls'>
        {
        !this.props.showDealer && this.props.roundResult === "Deal" ?
          <div>
            {this.showHitAndStay()}
            {this.showDouble()}
            {this.showSplit()}
            {this.showSurrender()}
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
    showDealer: state.showDealer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hittingPlayerCards: () => dispatch(hittingPlayerCards()),
    playerStay: () => dispatch(playerStay()),
    doublingPlayer: () => dispatch(doublingPlayer()),
    splittingPlayerCards: () => dispatch(splittingPlayerCards()),
    surrenderingPlayer: () => dispatch(surrenderingPlayer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
