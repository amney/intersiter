import React from 'react'
import autobind from 'autobind-decorator'

import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sitesCreators from '../redux/sites'

import Snackbar from 'material-ui/Snackbar'

const TENANT_MATCH = /tn-(.+)/i
const OUT_MATCH = /out-(.+)/i
const EPG_MATCH = /epg-(.+)/i

@connect(({intersiter, sites}) => ({intersiter, sites, site: sites[intersiter.site]}), (dispatch) => bindActionCreators(sitesCreators, dispatch))
class ConsumableEPG extends React.Component {

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
    this.props.saveEpgs(this.props.intersiter.site, 'consumableEpgs', epgs)
    this.setState({
      open: true,
    })
  }

  render() {
    const site = this.props.site
    let choices = {}

    site.extEpgs.map((epg) => {
      epg = epg.l3extInstP.attributes
      let dn = epg.dn.split('/')
      let tenant = dn[1].match(TENANT_MATCH)[1]
      let out = dn[2].match(OUT_MATCH)[1]
      let name = epg.name

      Object.assign(choices,{[epg.dn]: {tenant, ap: out, name}})
    })

    return (
      <ConfigSection title="Consumable External End Point Groups" subtitle="Choose the external EPGs that you wish neighbour EPGs to be installed on">
              <EPGSelector choices={choices} selected={this.props.site.consumableEpgs} onSave={this.onSave.bind(this)}/>
              <Snackbar
                open={this.state.open}
                message="Saved Consumable EPGs"
                action="Ok"
                autoHideDuration={3000}
                onRequestClose={this.handleRequestClose}
                onActionTouchTap={this.handleRequestClose}
              />
      </ConfigSection>
    )
  }

}

export default ConsumableEPG
