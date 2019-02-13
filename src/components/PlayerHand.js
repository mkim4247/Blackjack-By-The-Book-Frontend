import React from 'react'

class PlayerHand extends React.Component {

  showCards = () => {
    return this.props.hand.cards.map( (card, index) => {
      return <img src={card.image} alt={card.value} key={index}/>
    })
  }

  render(){
    return(
      <div>
        Player Hand
        {this.showCards()}
        <div> {this.props.hand.score} </div>
      </div>
    )
  }
}

export default PlayerHand
