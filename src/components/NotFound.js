import React from 'react'
import Nav from './Nav'

class NotFound extends React.Component {
  render(){
    return(
      <div>
      <Nav/>
      <div className='rules'>
        <div className='inner-rules'>
          <h1 style={{color: '#FEDD47'}}>
            Page Does Not Exist
          </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFound
