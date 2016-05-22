import React from 'react'
import h from '../helpers'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import {Card, CardTitle, CardText, CardHeader, CardExpandable} from 'material-ui/Card'

import {lightBlue700, blueGrey400} from 'material-ui/styles/colors'

import Navigation from './Navigation'
import SitelocalConfig from './SitelocalConfig'
import GlobalConfig from './GlobalConfig'
import ConfigurationHelper from './ConfigurationHelper'

import {container, centeredContainer,
  nestedContainer, navContainer, configContainer,
  marginHeader} from './style.css'
import {row} from 'flexboxgrid'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: lightBlue700,
    primary1Color: blueGrey400
  }
})


class Intersiter extends React.Component {

  render() {
    return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={container}>
        <div className={centeredContainer}>
          <div className={nestedContainer}>
            <div className={marginHeader}>
              <div className={navContainer}>
                <Navigation/>
              </div>
              <div className={configContainer}>
                { this.props.globalConfig ? <GlobalConfig /> : <SitelocalConfig /> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
    )
  }

}

function mapStateToProps({intersiter}) {
  return {
    globalConfig: intersiter.globalConfig,
  }
}

export default connect(mapStateToProps)(Intersiter)
