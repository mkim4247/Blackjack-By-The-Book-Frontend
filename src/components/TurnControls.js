import React from 'react'
import { connect } from 'react-redux'
import { hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, takeInsurance, passInsurance } from '../redux/actions'
import PropTypes from 'prop-types';

const TurnControls = props => {
  const showHitAndStay = () => {
    if(props.playerHand[props.index] && props.playerHand[props.index].cards.length > 0){
      return (
        <span>
          <button
            className='control-btns'
            onClick={props.hittingPlayerCards}>
              Hit
          </button>
          <button
            className='control-btns'
            onClick={props.playerStay}>
              Stay
          </button>
        </span>
      )
    }
  }

  const showDouble = () => {
    if(props.playerHand[props.index] && props.playerHand[props.index].cards.length === 2 && props.playerHand[props.index].bet <= props.user.pot){
      return (
        <button
          className='control-btns'
          onClick={props.doublingPlayer}>
            Double
        </button>
      )
    }
  }

  const showSplit = () => {
    if(props.playerHand[props.index] && props.playerHand[props.index].cards.length === 2 && props.playerHand[props.index].bet <= props.user.pot){
      if(props.playerHand[props.index].cards[0].value === props.playerHand[props.index].cards[1].value || (props.playerHand[props.index].score === 20 && !props.playerHand[props.index].cards.find( card => card.value === "ACE"))
      ){
        return (
          <button
            className='control-btns'
            onClick={props.splittingPlayerCards}>
              Split
          </button>
        )
      }
    }
  }

  return(
    <div id='controls'>
      {!props.showDealer && props.roundResult === "Deal" && props.insurance !== "ask" ?
        <span>
          {this.showDouble()}
          {this.showHitAndStay()}
          {this.showSplit()}
        </span>
      : null
      }
      {props.insurance === 'ask' ?
        <div>
          <div className='insurance-box'>
            Take Insurance for ${Math.ceil(props.bet/2)} ?
          </div>
          <div className='btns-div'>
            <button
              className='control-btns'
              onClick={props.takeInsurance}>
                Take
            </button>
            <button
              className='control-btns'
              onClick={props.passInsurance}>
                Pass
            </button>
          </div>
        </div>
        : null
      }
      {!props.gameOver && props.bet === 0 ?
        <div className='insurance-box'>
          Place Bet
        </div>
        : null
      }
    </div>
  )
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

TurnControls.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

TurnControls.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
