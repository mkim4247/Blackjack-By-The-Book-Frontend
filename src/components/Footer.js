import React from 'react'
import { connect } from 'react-redux'
import { toggleStrategy } from '../redux/actions'
import { hardTotal, softTotal, pairs } from '../StrategyHash'

const Footer = props => {
  const checkCount = () => {
    if(props.count > 0){
      return "Bet HIGH"
    }
    else if(props.count < 0){
      return "Bet LOW"
    }
  }

  const checkTable = () => {
    let currentHand = props.playerHand[this.props.index]
    let dealerCard = props.dealerHand.cards[0]

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

  return(
    <div className='footer'>
      <div className='left'
        style={
          props.bet > 0 ?
            {color: 'lightGreen'}
            :
            {color: 'yellow'}}>
        Bet Size: {props.bet}
      </div>
      <div className='left'>
        {props.showStrategy ?
          "Count: " + this.props.count
          : null
        }
      </div>
      <div className='left'>
        {props.showStrategy ? props.roundResult === "End" ?
          this.checkCount()
          :
          props.playerHand[props.index].score < 21 && !props.showDealer ?
            "Advice: " + this.checkTable()
            : null
          : null
        }
      </div>
      <button
        className='right'
        onClick={props.toggleStrategy}>
        {props.showStrategy ?
          "Hide Strategy"
          :
          "Show Strategy"
        }
      </button>
    </div>
  )
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
