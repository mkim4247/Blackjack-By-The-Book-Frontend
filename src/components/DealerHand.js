import React from 'react'

class DealerHand extends React.Component {
  render(){
    console.log(this.props)
    return(
      <div>
        Dealer Hand
        {this.props.cards.length > 0 ?
          <div>
        <img src={this.props.cards[0].image} alt={this.props.cards[0].value} />
        <img src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_grande.png?v=1535755695' alt='facedown'/>
        </div>
        : null}
      </div>
    )
  }
}

export default DealerHand
