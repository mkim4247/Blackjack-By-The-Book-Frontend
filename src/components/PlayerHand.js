import React from 'react'
import PropTypes from 'prop-types';

const PlayerHand = props => {
  const showCards = () => {
    return props.hand.cards.map( (card, index) => {
      return <img
        key={index}
        id={`playerCard-${index}`}
        className='cards'
        src={card.image}
        alt={card.value}
        />
      }
    )
  }

  const toggleResultClass = () => {
    switch(props.hand.result){
      case "LOSE":
        return "losing-hand"
      case "WIN":
        return "winning-hand"
      case "PUSH":
        return "push-hand"
      case "BUST":
        return "bust-hand"
      case "BLACKJACK":
        return "blackjack-hand"
      case "SURRENDER":
        return "surrender-hand"
      default:
        return null
    }
  }

  return(
    <span id='player-hand'>
      {this.showCards()}
      {props.hand.result ?
        <div
          id="player-result"
          className={this.toggleResultClass()}>
            {props.hand.result}
        </div>
        : null
      }
    </span>
  )
}

export default PlayerHand

CalendarContainer.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

CalendarContainer.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
