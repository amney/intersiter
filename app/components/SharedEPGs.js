import React from 'react'
import autobind from 'autobind-decorator'

import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sitesCreators from '../redux/sites'

import Snackbar from 'material-ui/Snackbar'

const TENANT_MATCH = /tn-(.+)/i
const AP_MATCH = /ap-(.+)/i
const EPG_MATCH = /epg-(.+)/i

@connect(({intersiter, sites}) => ({intersiter, sites, site: sites[intersiter.site]}), (dispatch) => bindActionCreators(sitesCreators, dispatch))
class SharedEPG extends React.Component {

  constructor(){
    super()
    this.state = {
      open: false,
    }
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  };

  onSave(epgs){
    this.props.saveEpgs(this.props.intersiter.site, 'sharedEpgs', epgs)
    this.setState({
      open: true,
    })
  }

  render() {
    const site = this.props.site
    let choices = {}

    if(site.epgs){
    site.epgs.map((epg) => {
      epg = epg.fvAEPg.attributes

      let dn = epg.dn.split('/')
      let tenant = dn[1].match(TENANT_MATCH)[1]
      let ap = dn[2].match(AP_MATCH)[1]
      let name = epg.name

      Object.assign(choices,{[epg.dn]: {tenant, ap, name}})
    })
    }

    return (
      <ConfigSection title="Shared End Point Groups" subtitle="Choose the EPGs that you wish to be advertised at external sites">
              <EPGSelector choices={choices} selected={this.props.site.sharedEpgs} onSave={this.onSave.bind(this)}/>
              <Snackbar
                open={this.state.open}
                message="Saved Shared EPGs"
                action="Ok"
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
                onActionTouchTap={this.handleRequestClose}
              />
      </ConfigSection>
    )
  }

}

export default SharedEPG
