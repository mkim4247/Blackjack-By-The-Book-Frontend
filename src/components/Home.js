import React from 'react'
import Nav from './Nav'
import TableContainer from './TableContainer'

class Home extends React.Component {
  render(){
    return(
      <div id='home'>
        <Nav />
        <TableContainer />
      </div>
    )
  }

}

export default Home
