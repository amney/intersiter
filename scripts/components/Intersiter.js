import React from 'react'
import h from '../helpers'
import reactMixin from 'react-mixin'
import { connect } from 'react-redux'

import ThemeManager from 'material-ui/lib/styles/theme-manager'
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme'

import Card from 'material-ui/lib/card/card'
import CardExpandable from 'material-ui/lib/card/card-expandable'
import CardHeader from 'material-ui/lib/card/card-header'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'
import Colors from 'material-ui/lib/styles/colors'

import Navigation from './Navigation'
import SitelocalConfig from './SitelocalConfig'
import GlobalConfig from './GlobalConfig'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class Intersiter extends React.Component {
  constructor() {
    super()
    this.state = {
      canSubmit: false,
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      siteLocal: false,
    }
  }
  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.lightBlue700,
      primary1Color: Colors.blueGrey400
    })
  }
  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    }
  }

  switchScope() {
    this.setState({
      siteLocal: !this.state.siteLocal
    })
  }

  render() {
    return (
      <div className="fabric-picker-container" style={ {  minHeight: '100%'} }>
        <div className="row  middle-lg  middle-md  middle-sm middle-xs" style={ {  minHeight: '100%'} }>
          <div className="col-lg-offset-2 col-lg-8 col-md-8 col-md-offset-2 col-sm-offset-1 col-sm-10 col-xs-12">
            <div style={ {  marginTop: 50} }>
              <div className="row" style={ {  paddingTop: 10,  paddingBottom: 25} }>
                <div className="col-lg-4 col-sm-12 col-xs-12">
                  <Navigation/>
                </div>
                <div className="col-lg-8 col-sm-12">
                  { this.props.globalConfig ? <GlobalConfig /> : <SitelocalConfig /> }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
Intersiter.childContextTypes = {
  muiTheme: React.PropTypes.object,
}

function mapStateToProps(state) {
  return {
    globalConfig: state.globalConfig,
  }
}

export default connect(mapStateToProps)(Intersiter)
