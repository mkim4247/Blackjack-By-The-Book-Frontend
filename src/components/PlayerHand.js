import React from 'react'

class PlayerHand extends React.Component {

  showCards = () => {
    return this.props.hand.cards.map( (card, index) => {
      return <img className='cards' src={card.image} alt={card.value} key={index}/>
    })
  }

  render(){
    return(
      <span id='player-hand'>
        {this.showCards()}
        <div id="player-result">
          {this.props.hand.result}
        </div>
      </span>
    )
  }
}

export default PlayerHand
