import React from 'react'

class PlayerHand extends React.Component {

  showCards = () => {
    return this.props.cards.map( (card, index) => {
      return <img src={card.image} alt={card.value} key={index}/>
    })
  }

  render(){
    console.log(this.props)
    return(
      <div>
        Player Hand
        {this.showCards()}
      </div>
    )
  }
}

export default PlayerHand
