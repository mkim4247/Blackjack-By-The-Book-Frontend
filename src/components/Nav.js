import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions'

class Nav extends React.Component {
  logout = () => {
    this.props.setUser(null);
    localStorage.clear()
  }

  showHiddenStats = event => {
    let stats = document.getElementById('hover-stats');
    stats.style.display = 'block'
  }

  hideHiddenStats = event => {
    let stats = document.getElementById('hover-stats');
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
            <div
              style={ this.props.user.pot > 0 ?
                {color: 'lightGreen'}
                :
                {color: 'red'}}
              className='left'>
              Pot: ${this.props.user.pot}
            </div>
            : null
          }
          {this.props.user ?
            <div className='left'>
              Hands Played: {this.props.user.current_streak}
            </div>
            : null
          }
          {this.props.user ?
            <button className='right' onClick={this.logout}>
              Logout
            </button>
            :
            <a href='login' className='right'>
              Login
            </a>
          }
          <a href="/rules" className='right'>
            Rules
          </a>
          <a href="/" className="right">
            Home
          </a>
        </div>
        {this.props.user ?
          <table id='hover-stats' style={{display: "none", fontFamily: "Phosphate-solid, Impact"}}>
            <thead style={{textDecoration: 'underline'}}>
              <tr>
                <th>
                  User Stats:
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Win Percent: { this.props.user.games_played > 0 ? Math.ceil(this.props.user.wins/this.props.user.games_played * 100) + "%" : "0%" }
                </td>
              </tr>
              <tr>
                <td>
                  Longest Run: {this.props.user.longest_streak}
                </td>
              </tr>
              <tr>
                <td>
                  Largest Pot: {this.props.user.largest_pot}
                </td>
              </tr>
            </tbody>
          </table>
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(Nav)
