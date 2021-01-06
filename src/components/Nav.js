import React from 'react'
import { connect } from 'react-redux'
import { setUser, resetCount } from '../redux/actions'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

const Nav = props => {
  const logout = () => {
    props.setUser(null);
    props.resetCount()
    localStorage.clear()
  }

  const showHiddenStats = event => {
    let stats = document.getElementById('hover-stats');
    stats.style.display = 'block'
  }

  const hideHiddenStats = event => {
    let stats = document.getElementById('hover-stats');
    stats.style.display = 'none'
  }

  return(
    <div>
      <div className='navbar'>
        {props.user && props.user.username !== "Guest" ?
          <div
            className='left'
            id='username'
            onMouseOver={() => this.showHiddenStats()}
            onMouseOut={() => this.hideHiddenStats()}>
              {props.user.username.toUpperCase()}
          </div>
          : null
        }
        {props.user ?
          <div
            style={ props.user.pot > 0 ?
              {color: 'lightGreen'}
              :
              {color: 'red'}}
            className='left'>
              Pot: ${props.user.pot}
          </div>
          : null
        }
        {props.user && props.user.username !== "Guest" ?
          <div
            className='left'>
              Hands Played: {props.user.current_streak}
          </div>
          : null
        }
        {props.user && props.user.username !== "Guest" ?
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
            onClick={logout}>
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
        {props.user ?
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
      {props.user && props.user.username !== "Guest" ?
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
                Win Percent: { props.user.games_played > 0 ? Math.ceil(props.user.wins/props.user.games_played * 100) + "%" : "0%" }
              </td>
            </tr>
            <tr>
              <td>
                Longest Run: {props.user.longest_streak}
              </td>
            </tr>
            <tr>
              <td>
                Largest Pot: {props.user.largest_pot}
              </td>
            </tr>
          </tbody>
        </table>
        : null
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser, resetCount })(Nav)


Nav.defaultProps = {
  reservations: [{start: '', end:'', title: ''}]
}

Nav.propTypes = {
  reservations: PropTypes.array,
  selectingTimeSlot: PropTypes.func
}
