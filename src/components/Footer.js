import React from 'react'
import { connect } from 'react-redux'
import { toggleStrategy } from '../redux/actions'
import { hardTotal, softTotal, pairs } from '../StrategyHash'

class Footer extends React.Component {
  checkCount = () => {
    if(this.props.count > 0){
      return "Bet HIGH"
    }
    else if(this.props.count < 0){
      return "Bet LOW"
    }
  }

  checkTable = () => {
    let currentHand = this.props.playerHand[this.props.index]
    let dealerCard = this.props.dealerHand.cards[0]

    if(currentHand.cards[0].value === currentHand.cards[1].value){
      return pairs[dealerCard.value][currentHand.cards[0].value]
    }
    else if(currentHand.cards[0].value === "ACE" || currentHand.cards[1].value === "ACE"){
      let otherCard = currentHand.cards.find( card => card.value !== "ACE")
      return softTotal[dealerCard.value][otherCard.value]
    }
    else {
      return hardTotal[dealerCard.value][currentHand.score]
    }
   }

  render(){
    return(
      <div className='footer'>
        <div className='left'
          style={ this.props.bet > 0 ?
            {color: 'lightGreen'}
            :
            {color: 'yellow'}}>
          Bet Size: {this.props.bet}
        </div>
        <div className='left'>
          {this.props.showStrategy ?
            "Count: " + this.props.count
            : null
          }
        </div>
        <div className='left'>
          {this.props.showStrategy ? this.props.roundResult === "End" ?
            this.checkCount()
            :
            this.props.playerHand[this.props.index].score < 21 && !this.props.showDealer ?
              "Advice: " + this.checkTable()
              : null
            : null
          }
        </div>
        <button className='right' onClick={this.props.toggleStrategy}>
          {this.props.showStrategy ?
            "Hide Strategy"
            :
            "Show Strategy"
          }
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    index: state.currentHandIndex,
    playerHand: state.playerHand,
    dealerHand: state.dealerHand,
    count: state.count,
    showDealer: state.showDealer,
    roundResult: state.roundResult,
    showStrategy: state.showStrategy,
    bet: state.bet
  }
}

export default connect(mapStateToProps, { toggleStrategy })(Footer)
