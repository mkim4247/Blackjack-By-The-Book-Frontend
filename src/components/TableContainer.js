import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import { connect } from 'react-redux'
import Strategy from './Strategy'
import Bet from './Bet'
import Pot from './Pot'
import Stats from './Stats'

class TableContainer extends React.Component {

  render(){
    return(
      <div id='table'>
        <Stats />
        <DealerContainer />


              <Strategy/>

              <Controls />

              <PlayerContainer />

              <div id='insurance-box'>
                {this.props.insurance === 'LOST' || this.props.insurance === 'WON' ?
                  <div> Insurance {this.props.insurance} </div>
                  : null
                }
              </div>

              <Bet />

              <Pot />
              <div id='result-box'>
                {this.props.roundResult !== "Start" && this.props.roundResult !== "Deal" ?
                  <div> {this.props.roundResult} </div> : null
                }
              </div>

      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    roundResult: state.roundResult,
    insurance: state.insurance
  }
}

export default connect(mapStateToProps)(TableContainer)
