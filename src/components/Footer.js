import React from 'react'
import { connect } from 'react-redux'
import { toggleStrategy } from '../redux/actions'

class Footer extends React.Component {
  render(){
    return(
      <div className='footer'>
        <div className='right' onClick={this.props.toggleStrategy}>
          {this.props.showStrategy ?
            "Hide Strategy" :
            "Show Strategy"
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showStrategy: state.showStrategy
  }
}

export default connect(mapStateToProps, { toggleStrategy })(Footer)
