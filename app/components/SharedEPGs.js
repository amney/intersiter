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
class SharedEPG extends React.Component {


  onSave(epgs){
    this.props.saveEpgs(this.props.intersiter.site, 'sharedEpgs', epgs)
  }

  render() {
    return (
      <ConfigSection title="Shared End Point Groups" subtitle="Choose the EPGs that you wish to be advertised at external sites">
              <EPGSelector choices={choices} selected={this.props.site.sharedEpgs} onSave={this.onSave.bind(this)}/>
      </ConfigSection>
    )
  }

}

export default SharedEPG
