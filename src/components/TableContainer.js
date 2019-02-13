import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import { connect } from 'react-redux'

import Strategy from './Strategy'

class TableContainer extends React.Component {

  render(){
    return(
      <div>
      Table Container
      <DealerContainer />
      <Controls />
      <PlayerContainer />

        {this.props.roundResult ?
        <div> {this.props.roundResult} </div>
        : null
        }
        <Strategy/>
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
