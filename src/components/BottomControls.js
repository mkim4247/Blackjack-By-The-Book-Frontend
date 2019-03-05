import React from 'react'
import { connect } from 'react-redux'
import { takeInsurance, passInsurance, dealingCards } from '../redux/actions'

class BottomControls extends React.Component {
  render(){
    return (
      <div id='extra-box'>

      {this.props.bet > 0 && this.props.roundResult !== "Deal" ?
        <button id='deal-btn' onClick={this.props.dealingCards}>Deal</button>
        :
        null
      }
      {this.props.insurance === 'LOST' || this.props.insurance === 'WON' ?
        <div> Insurance {this.props.insurance} </div>
        : null
      }

      {
      this.props.insurance === 'ask' ?
        <div>
          Take Insurance?
          <div>
            This will cost {this.props.bet/2}.
          </div>
          <button className='control-btns' onClick={this.props.takeInsurance}> Take </button>
          <button className='control-btns' onClick={this.props.passInsurance}> Pass </button>
        </div>
        : null
    }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    insurance: state.insurance,
    roundResult: state.roundResult,
    bet: state.bet
  }
}

export default connect(mapStateToProps, { takeInsurance, passInsurance, dealingCards })(BottomControls)
