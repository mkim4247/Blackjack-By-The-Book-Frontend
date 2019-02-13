import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import { connect } from 'react-redux'

import {countingCards} from '../redux/actions'

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
        <button onClick={this.props.countingCards}>Count</button>
      </div>
    )
  }
}



const mapStateToProps = state => {
  return {
    roundResult: state.roundResult
  }
}

export default connect(mapStateToProps, {countingCards})(TableContainer)
