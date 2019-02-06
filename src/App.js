import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { checkingToken, fetchingDeck } from './redux/actions'
import Login from './components/Login'
import Home from './components/Home'
import Create from './components/Create'

class App extends Component {
  componentDidMount(){
    let token = localStorage.getItem('token')
    if(token){
      this.props.checkingToken(token)
      this.props.fetchingDeck()
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' render={ () => (
                this.props.user ?
                <Home /> : <Redirect to='/login' />
              )} />
            <Route exact path='/login' render={ () => (
              this.props.user ?
              <Redirect to="/" /> : <Login />
              )} />
            <Route exact path='/new' render={ () => (
                this.props.user ?
                <Redirect to='/' /> : <Create />
              )} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps, { checkingToken, fetchingDeck })(App));
