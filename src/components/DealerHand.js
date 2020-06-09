import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const DealerHand = props => {
  return(
    <div id='dealer-hand'>
      {props.dealerHand.cards.length > 0 && props.showDealer ?
        props.dealerHand.cards.map( (card, index) => {
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
        props.dealerHand.cards.length > 0 ?
          <div>
            <img
              id='dealerCard-0'
              className='cards'
              src={props.dealerHand.cards[0].image}
              alt={props.dealerHand.cards[0].value}
            />
            <img
              id="facedown"
              className='cards'
              src='https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_grande.png?v=1535755695'
              alt='facedown'
            />
          </div>
        : null
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    dealerHand: state.dealerHand,
    showDealer: state.showDealer
  }
}

export default connect(mapStateToProps)(DealerHand)
