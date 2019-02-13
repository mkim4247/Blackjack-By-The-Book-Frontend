import React from 'react'
import { connect } from 'react-redux'

class DealerHand extends React.Component {

  showCards = () => {
    return true ?
      this.props.dealerHand.cards.map( (card, index) => {
      return <img src={card.image} alt={card.value} key={index}/>
    })
    :
      <div>
        <img src={this.props.cards[0].image} alt={this.props.cards[0].value} />
        <img id="facedown" src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_grande.png?v=1535755695' alt='facedown'/>
      </div>
  }

  render(){
    console.log(this.props)
    return(
      <div>
        Dealer Hand

          {this.showCards()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(DealerHand)
