import React from 'react'
import { connect } from 'react-redux'
import { takeInsurance, passInsurance, dealingCards, surrenderingPlayer } from '../redux/actions'

class BottomControls extends React.Component {


  showSurrender = () => {
    if(this.props.playerHand.length < 2 && this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2 && !this.props.showDealer && this.props.roundResult !== "End"){
      return (
        <button className='control-btns' onClick={this.props.surrenderingPlayer}> Surrender </button>
      )
    }
  }

  render(){
    return (
      <div id='extra-box'>

      {this.props.bet > 0 && this.props.roundResult !== "Deal" ?
        <button id='deal-btn' onClick={this.props.dealingCards}>Deal</button>
        :
        null
      }
      {this.props.insurance === 'LOST' || this.props.insurance === 'WON' ?
        <div> Insurance {this.props.insurance} </div>
        : null
      }

      {
      this.props.insurance === 'ask' ?
        <div>
          Take Insurance?
          <div>
            This will cost {this.props.bet/2}.
          </div>
          <button className='control-btns' onClick={this.props.takeInsurance}> Take </button>
          <button className='control-btns' onClick={this.props.passInsurance}> Pass </button>
        </div>
        : null
      }
      /* can only surrender on initial deal (not after splitting) */
      /* NOT SHOWING UP RIGHT */

      {this.showSurrender()}

      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    insurance: state.insurance,
    roundResult: state.roundResult,
    bet: state.bet,
    playerHand: state.playerHand,
    index: state.currentHandIndex,
    showDealer: state.showDealer,
    roundResult: state.roundResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    takeInsurance: () => dispatch(takeInsurance()),
    passInsurance: () => dispatch(passInsurance()),
    dealingCards: () => dispatch(dealingCards()),
    surrenderingPlayer: () => dispatch(surrenderingPlayer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomControls)
