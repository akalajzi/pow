import React, { Component, PropTypes } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  App,
  Blank,
} from 'containers'
import { Loader } from 'components'

const fakeUser = {
  isSuperUser: true,
}
const user = {
  auth: {
    isAuthenticated: true,
  }
}

const NoRouteMatch = ({ location }) => {
  return(
    <div>
      <h4>No such route <code>{location.pathname}</code></h4>
    </div>
  )
}

const AdminRoute = ({ component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeUser.isSuperUser && rest.auth.isAuthenticated
    ? ( React.createElement(component, props))
    : ( <Redirect to={{ pathname: '/', state: { from: props.location }}} />)
  )}/>
)

const appStateToProps = function(state) {
  // TODO: remove router from this callback when react-redux publishes v5
  // it is here to circumvent the blocking nature of connect
  // read: http://ajm.ooo/blocked-updates
  let { user, router } = state
  return { user, router }
}

class Router extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    // const { user } = this.props

    return (
      <div>
        {
          user.auth.verifyingToken
          ? <Loader />
        : <div>
        {
          !user.auth.isAuthenticated &&
          <Route component={ Login } />
        }
        {
          user.auth.isAuthenticated &&
          <div>
            <Route component={ Header } />
            <Switch>
              <Route exact path='/' component={ App } />
              <Route path='/login' component={ Login } />
              <Route path='/activity' component={ Activity } />
              <AdminRoute path='/admin' component={Blank} />
              { /* to be implemented */ }
              <Route path='/profile' component={Blank} />
              { /* catch all */ }
              <Route component={ NoRouteMatch } />
            </Switch>
          </div>
        }
        </div>
        }
      </div>
    )
  }
}

export default connect(appStateToProps, null)(Router);
