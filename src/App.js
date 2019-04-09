import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { checkingToken } from './redux/actions'
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Login from './components/Login'
import Home from './components/Home'
import Create from './components/Create'
import Rules from './components/Rules'
import About from './components/About'
import NotFound from './components/NotFound'

class App extends Component {

  componentDidMount(){
    let token = localStorage.getItem('token')

    if(token){
      this.props.checkingToken(token)
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
            <Route exact path='/rules' render={ () => (
                <Rules />
              )} />
            <Route exact path='/about' render={ () => (
                <About />
              )} />
            <Route component={NotFound}/>
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

export default withRouter(connect(mapStateToProps, { checkingToken })(App));
