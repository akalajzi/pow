import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import reducers from 'reducers';

import {App} from 'containers';
import 'styles/index.css';

const history = createHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers, /* preloadedState, */
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(Request, routerMiddleware(history)))
  )
)
/* eslint-enable */

// const token = cookie.getToken();
// if (token.length > 0) {
//   store.dispatch(verifyToken(token));
// }

const muiTheme = getMuiTheme({
  background: '#0097a9',
})

injectTapEventPlugin()

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
