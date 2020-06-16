import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const Info = props => {
  const renderStrategy = () => {
    if(props.playerHand[props.index] && props.playerHand[props.index].cards.length > 0){
      return (
        <table id='inner-strategy'>
          <tbody>
            <tr>
              <td>
                Dealer:
              </td>
              <td>
                {props.showDealer ?
                  props.dealerHand.score
                  :
                  props.dealerHand.cards[0].value
                }
              </td>
            </tr>
            <tr>
              <td>
                Player:
              </td>
              <td>
                {props.playerHand[props.index].score}
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  }

  return(
    <div id='strategy-box'>
      {this.renderStrategy()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    index: state.currentHandIndex,
    playerHand: state.playerHand,
    dealerHand: state.dealerHand,
    showDealer: state.showDealer,
  }
}

export default connect(mapStateToProps)(Info)

Info.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

Info.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
