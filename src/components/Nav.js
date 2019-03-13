import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions'

class Nav extends React.Component {
  logout = () => {
    this.props.setUser(null)
    localStorage.clear()
  }

  showHiddenStats = event => {
    let stats = document.getElementById('hover-stats')
    stats.style.display = 'block'
  }

  hideHiddenStats = event => {
    let stats = document.getElementById('hover-stats')
    stats.style.display = 'none'
  }

  render(){
    return(
      <div>

        <div className='navbar'>
            {this.props.user ?
              <div className='left' id='username' onMouseOver={() => this.showHiddenStats()} onMouseOut={() => this.hideHiddenStats()}> {this.props.user.username.toUpperCase()} </div>
              : null
            }
            {this.props.user ?
              <div className='left'> Pot: ${this.props.user.pot} </div>
              : null
            }
            {this.props.user ?
              <div className='left'>
                Streak: {this.props.user.current_streak}
              </div>
              : null
            }
            <button className='right' onClick={this.logout}>Logout</button>
            <a href="/rules" className='right'>Rules</a>
            <a href="/" className="right">Home</a>
        </div>
        {this.props.user ?
        <div id='hover-stats' style={{display: "none"}}>

          <div>
            Win Percent: { this.props.user.games_played > 0 ? this.props.user.wins/this.props.user.games_played : "0%" }
          </div>
          <hr/>
          <div>
            Longest Streak: {this.props.user.longest_streak}
          </div>
          <hr/>
          <div>
            Largest Pot: {this.props.user.largest_pot}
          </div>
        </div>
        : null
      }
      </div>

    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(Nav)
