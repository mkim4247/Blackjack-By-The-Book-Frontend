import React from 'react'

class PlayerHand extends React.Component {
  showCards = () => {
    return this.props.hand.cards.map( (card, index) => {
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

  toggleResultClass = () => {
    switch(this.props.hand.result){
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

  render(){
    return(
      <span id='player-hand'>
        {this.showCards()}
        {this.props.hand.result ?
          <div id="player-result" className={this.toggleResultClass()}>
            {this.props.hand.result}
          </div>
          : null
        }
      </span>
    )
  }
}

export default PlayerHand
