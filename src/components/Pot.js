import React from 'react'
import { connect } from 'react-redux'
import { placeBet } from '../redux/actions'

class Pot extends React.Component {

  decreaseBet = event => {
    this.props.placeBet(-5)
  }

  render(){
    return(
      <div onClick={this.decreaseBet} style={{border: '1px solid red'}}> Decrease Bet
      <div>{this.props.bet} </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bet: state.bet
  }
}

export default connect(mapStateToProps, { placeBet })(Pot)
