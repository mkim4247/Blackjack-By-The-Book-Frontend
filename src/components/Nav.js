import React from 'react'
import { connect } from 'react-redux'
import { setUser, resetCount } from '../redux/actions'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {
  logout = () => {
    this.props.setUser(null);
    this.props.resetCount()
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
          {this.props.user && this.props.user.username !== "Guest" ?
            <div
              className='left'
              id='username'
              onMouseOver={() => this.showHiddenStats()}
              onMouseOut={() => this.hideHiddenStats()}>
                {this.props.user.username.toUpperCase()}
            </div>
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
          {this.props.user && this.props.user.username !== "Guest" ?
            <div
              className='left'>
                Hands Played: {this.props.user.current_streak}
            </div>
            : null
          }
          {this.props.user && this.props.user.username !== "Guest" ?
            <button
              className='right'
              onClick={this.logout}>
                Logout
            </button>
            :
            <NavLink
              exact
              to='login'
              className='right'
              activeStyle={{
                fontWeight: "bold",
                color: "black",
                backgroundColor: 'white'
              }}
              onClick={this.logout}>
                Login
            </NavLink>
          }
          <NavLink
            exact
            to="/about"
            className='right'
            activeStyle={{
              fontWeight: "bold",
              color: "black",
              backgroundColor: 'white'
            }}>
              About
          </NavLink>
          <NavLink
            exact
            to="/rules"
            className='right'
            activeStyle={{
              fontWeight: "bold",
              color: "black",
              backgroundColor: 'white'
            }}>
              Rules
          </NavLink>
          {this.props.user ?
            <NavLink
              exact
              to="/"
              className="right"
              activeStyle={{
                fontWeight: "bold",
                color: "black",
                backgroundColor: 'white'
              }}>
                Home
            </NavLink>
            : null
          }
        </div>
        {this.props.user && this.props.user.username !== "Guest" ?
          <table
            id='hover-stats'
            style={{
              display: "none",
              fontFamily: "Phosphate-solid, Impact"
            }}>
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

export default connect(mapStateToProps, { setUser, resetCount })(Nav)
