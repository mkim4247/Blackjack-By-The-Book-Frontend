import React from 'react'

class PlayerHand extends React.Component {

  showCards = () => {
    return this.props.hand.cards.map( (card, index) => {
      return <img className='cards' src={card.image} alt={card.value} key={index}/>
    })
  }

  toggleResultClass = () => {
    if(this.props.hand.result === "DEALER WINS"){
      return "losing-hand"
    }
    else if(this.props.hand.result === "PLAYER WINS"){
      return "winning-hand"
    }
    else if(this.props.hand.result === "PUSH"){
      return "push-hand"
    }
    else if(this.props.hand.result === "BUST"){
      return "bust-hand"
    }
    else if(this.props.hand.result === "BLACKJACK"){
      return "blackjack-hand"
    }
  }

  render(){
    return(
      <span id='player-hand'>
        {this.showCards()}
        <div id="player-result" className={this.toggleResultClass()}>
          {this.props.hand.result}
        </div>
      </span>
    )
  }
}

export default PlayerHand
