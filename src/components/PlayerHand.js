import React from 'react'

class PlayerHand extends React.Component {

  showCards = () => {
    return this.props.hand.cards.map( (card, index) => {
      return <img className='cards' src={card.image} alt={card.value} key={index}/>
    })
  }

  render(){
    return(
      <div id='player-hand'>
        {this.showCards()}
        <div> {this.props.hand.score} </div>
      </div>
    )
  }
}

export default PlayerHand
