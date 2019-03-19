import React from 'react'
import { connect } from 'react-redux'
import { dealingCards, surrenderingPlayer, restartGame } from '../redux/actions'

class RoundControls extends React.Component {
  /* can only surrender on initial deal (not after splitting) */
  showSurrender = () => {
    if(this.props.playerHand.length < 2 && this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length === 2 && !this.props.showDealer && this.props.roundResult !== "End"){
      return (
        <button className='control-btns' onClick={this.props.surrenderingPlayer}>
          Surrender
        </button>
      )
    }
  }

  render(){
    return (
      <div id='extra-box'>
        {this.props.bet > 0 && this.props.roundResult !== "Deal" && this.props.deckId ?
          <button className='control-btns' onClick={this.props.dealingCards}>
            Deal
          </button>
          :
          null
        }
        {this.props.insurance !== "ask" ?
          this.showSurrender()
          : null
        }
        {this.props.gameOver ?
          <button className='control-btns' onClick={this.props.restartGame}>
            New Game
          </button>
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
    gameOver: state.gameOver,
    deckId: state.deckId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dealingCards: () => dispatch(dealingCards()),
    surrenderingPlayer: () => dispatch(surrenderingPlayer()),
    restartGame: () => dispatch(restartGame())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoundControls)