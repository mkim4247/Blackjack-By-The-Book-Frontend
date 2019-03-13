import React from 'react'
import { connect } from 'react-redux'

class Count extends React.Component {

  renderCount = () => {
    if(this.props.playerHand[this.props.index] && this.props.playerHand[this.props.index].cards.length > 0){
      return (
        <div id='inner-count'>
          {this.props.roundResult === "End" ?
            <div>
              Count: {this.props.count}
              <hr/>
              <div>
                {this.checkCount()}
              </div>
            </div>
          :
          <div>
            Count: {this.props.count}
          </div>
          }
        </div>
      )
      }
    }

    checkCount = () => {
      if(this.props.count > 0){
        return(
          <div>
            Positive Count.
          <br/>
            Bet HIGH.
          </div>
          )
        }
        else if(this.props.count < 0){
          return(
            <div>
              Negative Count.
            <br/>
              Bet LOW.
            </div>
            )
          }
          else if(this.props.count === 0){
            return(
              <div>
                Count Zero.
              </div>
            )
          }
      }

  render(){
    return(
      <div id='count-box'>
        {this.props.showStrategy ?
          this.renderCount() : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    index: state.currentHandIndex,
    playerHand: state.playerHand,
    dealerHand: state.dealerHand,
    count: state.count,
    showDealer: state.showDealer,
    roundResult: state.roundResult,
    showStrategy: state.showStrategy
  }
}

export default connect(mapStateToProps)(Count)
