import React from 'react'

import { connect } from 'react-redux'
import { dealingCards, hittingPlayerCards, playerStay, doublingPlayer, splittingPlayerCards, takeInsurance, passInsurance } from '../redux/actions'

class Controls extends React.Component {

  render(){
    return(
      <div id='controls'>
      Controls
      {
        this.props.playerHand[0].cards.length > 0 ?
      <div>
      <button onClick={this.props.dealingCards}>Deal</button>
        <div>
          {
            !this.props.roundResult ?
            <div>
              <button onClick={this.props.hittingPlayerCards}>Hit</button>
              <button onClick={this.props.playerStay}>Stay</button>
            </div>
            : null
          }


          {
            this.props.playerHand[this.props.index].cards.length < 3 && this.props.playerHand[this.props.index].cards.length > 0 ?
            <button onClick={this.props.doublingPlayer}>Double</button>
            : null
          }
          /* currently cant' split face cards and tens */
          {
            this.props.playerHand[this.props.index].cards.length > 0 && this.props.playerHand[this.props.index].cards.length < 3 && this.props.playerHand[this.props.index].cards[0].value === this.props.playerHand[this.props.index].cards[1].value ?
            <button onClick={this.props.splittingPlayerCards}> Split </button>
            : null
          }

        {
          this.props.insurance === 'ask' ?
            <div>
              <button onClick={this.props.takeInsurance}> Take Insurance </button>
              <button onClick={this.props.passInsurance}> Pass Insurance </button>
            </div>
            : null
        }
        </div>
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
    playerAction: state.playerAction,
    roundResult: state.roundResult,
    insurance: state.insurance,
    index: state.currentHandIndex
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dealingCards: () => dispatch(dealingCards()),
    hittingPlayerCards: () => dispatch(hittingPlayerCards()),
    playerStay: () => dispatch(playerStay()),
    doublingPlayer: () => dispatch(doublingPlayer()),
    splittingPlayerCards: () => dispatch(splittingPlayerCards()),
    takeInsurance: () => dispatch(takeInsurance()),
    passInsurance: () => dispatch(passInsurance())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
