import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import Strategy from './Strategy'
import Bet from './Bet'
import Pot from './Pot'
import Stats from './Stats'
import BottomControls from './BottomControls'
import Footer from './Footer'

class TableContainer extends React.Component {

  render(){
    return(
      <div id='table'>
        <Stats />
        <DealerContainer />
        <Strategy/>
        <Controls />
        <PlayerContainer />
        <Bet />
        <Pot />
        <BottomControls />
        <Footer />
      </div>
    )
  }
}


export default TableContainer
