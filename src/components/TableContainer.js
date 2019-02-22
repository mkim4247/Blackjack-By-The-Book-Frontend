import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import { connect } from 'react-redux'
import Strategy from './Strategy'
import Bet from './Bet'
import Pot from './Pot'

class TableContainer extends React.Component {

  render(){
    return(
      <div id='table'>
      Table Container
      <DealerContainer />
      <Controls />
      <Pot />
      <PlayerContainer />

        {this.props.roundResult !== "start" ?
          <div>
            {this.props.roundResult}
            <button> Deal </button>
          </div>
          : null
        }
        <Strategy/>
        <Bet />
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    roundResult: state.roundResult
  }
}

export default connect(mapStateToProps)(TableContainer)
