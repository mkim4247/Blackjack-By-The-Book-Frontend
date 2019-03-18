import React from 'react'
import { connect } from 'react-redux'

class DealerHand extends React.Component {
  render(){
    return(
      <div id='dealer-hand'>
        {this.props.dealerHand.cards.length > 0 && this.props.showDealer ?
          this.props.dealerHand.cards.map( (card, index) => {
            return <img
              key={index}
              id={`dealerCard-${index}`}
              className='cards'
              src={card.image}
              alt={card.value}
              />
            }
          )
          :
          this.props.dealerHand.cards.length > 0 ?
            <div>
              <img
                id='dealerCard-0'
                className='cards'
                src={this.props.dealerHand.cards[0].image}
                alt={this.props.dealerHand.cards[0].value}
              />
              <img
                id="facedown"
                className='cards' src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_grande.png?v=1535755695'
                alt='facedown'
              />
            </div>
            : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dealerHand: state.dealerHand,
    showDealer: state.showDealer
  }
}

export default connect(mapStateToProps)(DealerHand)
