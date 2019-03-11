import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../redux/actions'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Nav extends React.Component {
  logout = () => {
    this.props.setUser(null)
    localStorage.clear()
  }

  render(){
    return(
      <div id='nav'>
        <Menu size='small' inverted>
          <Menu.Menu position='left'>
            <Menu.Item
              name={this.props.user.username.toUpperCase()}
            />
          </Menu.Menu>
          <Menu.Menu position='right'>
            <Menu.Item
                as={NavLink}
                name='Home'
                to='/'>
            </Menu.Item>
            <Menu.Item
                as={NavLink}
                name='Rules'
                to='/rules'>
            </Menu.Item>
            {this.props.user ?
              <Menu.Item
                name="Logout"
                onClick={this.logout}>
              </Menu.Item>
              :
              <Menu.Item
                as={NavLink}
                name="Login"
                to='/login' />
            }
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { user: state.user }
}

export default connect(mapStateToProps, { setUser })(Nav)
