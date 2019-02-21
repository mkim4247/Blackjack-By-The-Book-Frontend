import React from 'react'
import { connect } from 'react-redux'
import { placeBet } from '../redux/actions'

class Bet extends React.Component {

  increaseBet = event => {
    let bet = parseInt(event.currentTarget.value)
    this.props.placeBet(bet)
  }

  render(){
    return(
      <div id='bet-box'>
      {this.props.roundResult ?
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
    roundResult: state.roundResult
  }
}

export default connect(mapStateToProps, { placeBet })(Bet)
