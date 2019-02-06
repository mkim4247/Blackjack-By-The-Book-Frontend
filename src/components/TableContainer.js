import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'

class TableContainer extends React.Component {

  render(){
    return(
      <div>
      Table Container
      <DealerContainer />
      <PlayerContainer />
      </div>
    )
  }
}

export default TableContainer
