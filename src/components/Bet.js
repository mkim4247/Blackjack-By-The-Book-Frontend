import React from 'react'
import { connect } from 'react-redux'
import { placeBet } from '../redux/actions'

class Bet extends React.Component {

  bet = event => {
    let bet = parseInt(event.currentTarget.value)
    this.props.placeBet(bet)
  }

  render(){
    return(
      <div>
      {this.props.roundResult ?
        <div>
        <button onClick={this.bet} value='5'> 5 </button>
        <button onClick={this.bet} value='10'> 10 </button>
        <button onClick={this.bet} value='25'> 25 </button>
        <button onClick={this.bet} value='50'> 50 </button>
        <button onClick={this.bet} value='100'> 100 </button>
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
