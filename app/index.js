import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { intersiter } from './redux/intersiter'
import { sites } from './redux/sites'
import { connections } from './redux/connections'

import NotFound from './components/NotFound'
import Intersiter from './components/Intersiter'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

var reducers = combineReducers({
  intersiter,
  sites,
  connections
})


function configureStore(initialState) {
  const store = createStore(reducers, initialState, 
    window.devToolsExtension ? window.devToolsExtension() : undefined
  )
  return store
}
var store = configureStore()

var routes = (
<Provider store={ store }>
  <Router history={ browserHistory }>
    <Route path="/" component={ Intersiter } />
    <Route path="*" component={ NotFound } />
  </Router>
</Provider>
)

ReactDOM.render(routes, document.querySelector('#app'))
