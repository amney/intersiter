import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { intersiter } from './redux/intersiter'
import { sites } from './redux/sites'
import { connections } from './redux/connections'
import { sync } from './redux/sync'

import NotFound from './components/NotFound'
import Intersiter from './components/Intersiter'
import SitelocalConfig from './components/SitelocalConfig'
import GlobalConfig from './components/GlobalConfig'
import SyncConfig from './components/SyncConfig'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

var reducers = combineReducers({
  intersiter,
  sites,
  connections,
  sync,
  routing: routerReducer
})


function configureStore(initialState) {
  const store = createStore(reducers, {}, compose(
    applyMiddleware(thunk, routerMiddleware(browserHistory)),
    window.devToolsExtension ? window.devToolsExtension() : undefined
  ))
  return store
}
var store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

var routes = (
<Provider store={ store }>
  <Router history={ history }>
    <Route path="/" component={ Intersiter }>
      <IndexRoute component={GlobalConfig}/>
      <Route path="site" component={ SitelocalConfig } />
      <Route path="sync" component={ SyncConfig } />
    </Route>
    <Route path="*" component={ NotFound } />
  </Router>
</Provider>
)

ReactDOM.render(routes, document.querySelector('#app'))
