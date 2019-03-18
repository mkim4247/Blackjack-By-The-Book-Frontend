import React from 'react'
import DealerContainer from './DealerContainer'
import PlayerContainer from './PlayerContainer'
import Controls from './Controls'
import Info from './Info'
import Bet from './Bet'
import Pot from './Pot'
// import Count from './Count'
import BottomControls from './BottomControls'
import Footer from './Footer'

const TableContainer = () => {
  return(
    <div id='table'>
      <DealerContainer />
      <Info/>
      <Controls />
      <PlayerContainer />
      <Bet />
      <Pot />
      <BottomControls />
      <Footer />
    </div>
  )
}

/* REMOVED <COUNT/> FROM TOP OF RENDER */

export default TableContainer
