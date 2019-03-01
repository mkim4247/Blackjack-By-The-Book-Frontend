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
    if(this.props.bet >= 100){
      return (
        <div>
          <input className='betting-chips' type="image" src={require('../images/blackchip.svg')} onClick={() => this.props.placingBet(-100)} alt='Black Chip/100'/>
            <input className='betting-chips' type="image" src={require('../images/lightbluechip.svg')} onClick={() => this.props.placingBet(-25)} alt='Light Blue Chip/25'/>
              <input className='betting-chips' type="image" src={require('../images/redchip.svg')} onClick={() => this.props.placingBet(-5)} alt='Red Chip/5'/>
              <input className='betting-chips' type="image" src={require('../images/greenchip.svg')} onClick={() => this.props.placingBet(-1)} alt='Green Chip/1'/>
        </div>
      )
    }
    else if(this.props.bet >= 25 && this.props.bet < 100){
      return (
        <div>
          <input className='betting-chips' type="image" src={require('../images/lightbluechip.svg')} onClick={() => this.props.placingBet(-25)} alt='Light Blue Chip/25'/>
            <input className='betting-chips' type="image" src={require('../images/redchip.svg')} onClick={() => this.props.placingBet(-5)} alt='Red Chip/5'/>
            <input className='betting-chips' type="image" src={require('../images/greenchip.svg')} onClick={() => this.props.placingBet(-1)} alt='Green Chip/1'/>
        </div>
      )
    }
    else if(this.props.bet >= 5 && this.props.bet < 25){
      return (
        <div>
          <input className='betting-chips' type="image" src={require('../images/redchip.svg')} onClick={() => this.props.placingBet(-5)} alt='Red Chip/5'/>
          <input className='betting-chips' type="image" src={require('../images/greenchip.svg')} onClick={() => this.props.placingBet(-1)} alt='Green Chip/1'/>
        </div>
      )
    }
    else if(this.props.bet >= 1){
      return (
        <div>
          <input className='betting-chips' type="image" src={require('../images/greenchip.svg')} onClick={() => this.props.placingBet(-1)} alt='Green Chip/1'/>
        </div>
      )
    }
  }

  render(){
    return(
      <div id='pot-box'>
        {this.props.bet > 0 ?
          <div> {this.props.bet} </div>
          :
          <div> Place Your Bets </div>
        }

        {this.props.roundResult !== 'Deal' ?
          this.decBetButtons() : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // playerHand: state.playerHand
    roundResult: state.roundResult,
    bet: state.bet
  }
}

export default connect(mapStateToProps, { placingBet })(Pot)
