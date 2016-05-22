import React from 'react'
import autobind from 'autobind-decorator'

import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sitesCreators from '../redux/sites'

const choices = {
    "EPG1" : "Tenant 1"
}

@connect(({intersiter, sites}) => ({intersiter, sites, site: sites[intersiter.site]}), (dispatch) => bindActionCreators(sitesCreators, dispatch))
class ConsumableEPG extends React.Component {

  onSave(epgs){
    this.props.saveEpgs(this.props.intersiter.site, 'consumableEpgs', epgs)
  }

  render() {
    return (
      <ConfigSection title="Consumable External End Point Groups" subtitle="Choose the external EPGs that you wish neighbour EPGs to be installed on">
              <EPGSelector choices={choices} selected={this.props.site.consumableEpgs} onSave={this.onSave.bind(this)}/>
      </ConfigSection>
    )
  }

}

export default ConsumableEPG
