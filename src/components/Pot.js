import React from 'react'
import { connect } from 'react-redux'
import { placingBet } from '../redux/actions'

const Pot = props => {
  const decBetButtons = () => {
    if(props.bet >= 100){
      return (
        <div>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/blackchip.svg')}
            onClick={() => props.placingBet(-100)}
            alt='Black Chip/100'/>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/lightbluechip.svg')}
            onClick={() => props.placingBet(-25)}
            alt='Light Blue Chip/25'/>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/redchip.svg')}
            onClick={() => props.placingBet(-5)}
            alt='Red Chip/5'/>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/greenchip.svg')}
            onClick={() => props.placingBet(-1)}
            alt='Green Chip/1'/>
        </div>
      )
    }
    else if(props.bet >= 25 && props.bet < 100){
      return (
        <div>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/lightbluechip.svg')}
            onClick={() => props.placingBet(-25)}
            alt='Light Blue Chip/25'/>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/redchip.svg')}
            onClick={() => props.placingBet(-5)}
            alt='Red Chip/5'/>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/greenchip.svg')}
            onClick={() => props.placingBet(-1)}
            alt='Green Chip/1'/>
        </div>
      )
    }
    else if(props.bet >= 5 && props.bet < 25){
      return (
        <div>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/redchip.svg')}
            onClick={() => props.placingBet(-5)}
            alt='Red Chip/5'/>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/greenchip.svg')}
            onClick={() => props.placingBet(-1)}
            alt='Green Chip/1'/>
        </div>
      )
    }
    else if(props.bet >= 1){
      return (
        <div>
          <input
            className='betting-chips'
            type="image"
            src={require('../images/greenchip.svg')}
            onClick={() => props.placingBet(-1)}
            alt='Green Chip/1'/>
        </div>
      )
    }
  }

  return(
    <div id='pot-box'>
      {props.roundResult !== 'Deal' ?
        this.decBetButtons()
        : null
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    roundResult: state.roundResult,
    bet: state.bet
  }
}

export default connect(mapStateToProps, { placingBet })(Pot)
