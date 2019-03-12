import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions'

class Nav extends React.Component {
  logout = () => {
    this.props.setUser(null)
    localStorage.clear()
  }

  render(){
    return(
        <div className='navbar'>
            {this.props.user ?
              <div className='left' id='username' onMouseOver={() => console.log('HI')}> {this.props.user.username.toUpperCase()} </div>
              : null
            }
            {this.props.user ?
              <div className='left'> Pot: {this.props.user.pot} </div>
              : null
            }
            {this.props.user ?
              <div className='left'>
                Streak: {this.props.user.current_streak}
              </div>
              : null
            }
            <a className='right' onClick={this.logout}>Logout</a>
            <a href="/rules" className='right'>Rules</a>
            <a href="/" className="right">Home</a>
        </div>

    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(Nav)
