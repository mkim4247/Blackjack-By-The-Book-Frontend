import React from 'react'
import { connect } from 'react-redux'

class Info extends React.Component {
  renderStrategy = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <table id='inner-strategy'>
          <tbody>
            <tr>
              <td>
                Dealer:
              </td>
              <td>
                {this.props.showDealer ?
                  this.props.dealerHand.score
                  :
                  this.props.dealerHand.cards[0].value
                }
              </td>
            </tr>
            <tr>
              <td>
                Player:
              </td>
              <td>
                {this.props.playerHand[this.props.index].score}
              </td>
            </tr>
          </tbody>
        </table>
      )
    }
  }
  // <br/>
  // {this.props.playerHand[this.props.index].score < 21 && !this.props.showDealer ?
    // <span> <hr/> Advice: {this.checkTable()} </span>
    // : null
  // }

  render(){
    return(
      <div id='strategy-box'>
        {this.renderStrategy()}
      </div>
    )
  }
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
