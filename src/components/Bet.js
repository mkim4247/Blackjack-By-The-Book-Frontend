import React from 'react'
import { connect } from 'react-redux'
import { placingBet } from '../redux/actions'

class Bet extends React.Component {

  increaseBet = event => {
    let amount = parseInt(event.currentTarget.value)

    if(this.props.user.pot >= amount){
      this.props.placingBet(amount)
    }
    else {
      return(
        <div id='extra-box'>
          Insufficient Funds
        </div>
      )
    }
  }

  render(){
    return(
      <div id='bet-box'>
      {this.props.roundResult !== "Deal" ?
        <div>
          <div>
            {this.props.user.pot >= 1 ?
              <input className='betting-chips' type="image" src={require('../images/greenchip.svg')} onClick={this.increaseBet} value='1' alt='Green Chip/1'/>
              : null
            }
            {this.props.user.pot >=5 ?
              <input className='betting-chips' type="image" src={require('../images/redchip.svg')} onClick={this.increaseBet} value='5' alt='Red Chip/5'/>
              : null
            }
          </div>
            <div>
            {this.props.user.pot >= 25 ?
              <input className='betting-chips' type="image" src={require('../images/lightbluechip.svg')} onClick={this.increaseBet} value='25' alt='Light Blue Chip/25'/>
              : null
            }
            {this.props.user.pot >= 100 ?
                <input className='betting-chips' type="image" src={require('../images/blackchip.svg')} onClick={this.increaseBet} value='100' alt='Black Chip/100'/>
                : null
            }
          </div>
          {this.props.user.pot > 1 ?
            <input className='betting-chips' type="image" src={require('../images/whitechip.svg')} onClick={this.increaseBet} value={this.props.user.pot} alt='White Chip/All in'/>
            : null
          }
        </div>
        : null
      }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    roundResult: state.roundResult,
    bet: state.bet
  }
}

export default connect(mapStateToProps, { placingBet })(Bet)
