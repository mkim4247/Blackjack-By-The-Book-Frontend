import React from 'react'
import { connect } from 'react-redux'
import { placeBet } from '../redux/actions'

class Bet extends React.Component {

  increaseBet = event => {
    let amount = parseInt(event.currentTarget.value)
    if(this.props.user.pot >= (this.props.bet + amount)){
      this.props.placeBet(amount)
    }
    else {
      console.log('Insufficient Funds')
    }
  }

  render(){
    return(
      <div id='bet-box'>
      {this.props.roundResult !== "Deal" ?
        <div>
        <button onClick={this.increaseBet} value='5'> 5 </button>
        <button onClick={this.increaseBet} value='10'> 10 </button>
        <button onClick={this.increaseBet} value='25'> 25 </button>
        <button onClick={this.increaseBet} value='50'> 50 </button>
        <button onClick={this.increaseBet} value={this.props.user.pot}> All In </button>
        </div>
        : null
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    roundResult: state.roundResult,
    bet: state.bet
  }
}

export default connect(mapStateToProps, { placeBet })(Bet)
