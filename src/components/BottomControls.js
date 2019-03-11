import React from 'react'
import { connect } from 'react-redux'
import { dealingCards, surrenderingPlayer } from '../redux/actions'

class BottomControls extends React.Component {

  /* can only surrender on initial deal (not after splitting) */
  showSurrender = () => {
    if(this.props.playerHand.length < 2 && this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2 && !this.props.showDealer && this.props.roundResult !== "End"){
      return (
        <button className='bottom-btns' onClick={this.props.surrenderingPlayer}> Surrender </button>
      )
    }
  }

  render(){
    return (
      <div id='extra-box'>
        {this.props.bet > 0 ?
          <div className='place-bets-marker'> Bet Size: {this.props.bet} </div>
          :
          <div className='place-bets-marker'> Place Your Bets </div>
        }

        <br/>
        {this.props.bet > 0 && this.props.roundResult !== "Deal" ?
          <button className='bottom-btns' onClick={this.props.dealingCards}>Deal</button>
          :
          null
        }

        {this.props.insurance !== "ask" ?
          this.showSurrender()
          : null
        }

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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dealingCards: () => dispatch(dealingCards()),
    surrenderingPlayer: () => dispatch(surrenderingPlayer())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomControls)
