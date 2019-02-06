import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'


class TableContainer extends React.Component {

  render(){
    return(
      <div>
      Table Container
      <DealerContainer />
      <Controls />
      <PlayerContainer />
      </div>
    )
  }
}

export default TableContainer
