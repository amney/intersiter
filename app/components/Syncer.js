import React from 'react'
import autobind from 'autobind-decorator'

import ConfigSection from './ConfigSection'
import EPGSelector from './EPGSelector'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as sitesCreators from '../redux/sites'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

const TENANT_MATCH = /tn-(.+)/i
const AP_MATCH = /ap-(.+)/i
const EPG_MATCH = /epg-(.+)/i

@connect(({sync, sites, connections}) => ({sync, sites, connections}), (dispatch) => bindActionCreators({}, dispatch))
class Syncer extends React.Component {

  render() {
    const siteCards = this.props.sync.sites.map((k) => {
                var site = this.props.sites[k]
                var connection = this.props.connections[k]
                return (<Step key={k}>
                  <StepLabel>{site.name}</StepLabel>
                  <StepContent>
                    <p>
                      {connection.address}
                    </p>
                  </StepContent>
                </Step>)})

    return (
      <ConfigSection title="Interister Sync Configuration" subtitle="Collecting all of your EPGs and mirroring them to each site">
        <Stepper activeStep={this.props.sync.stage} orientation="vertical">
          <Step>
            <StepLabel>Selecting All Sites</StepLabel>
            <StepContent>
              <p>
                Checking that each ACI site has an multi-site tool instance
                running and that it is reachable from the intersiter tool.
              </p>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Building Configuration For Each Site</StepLabel>
            <StepContent>
              <p>
                For each site collect all the EPGs that must be mirrored
              </p>
              <Stepper activeStep={this.props.sync.siteIndex} orientation="vertical">
                {siteCards}
              </Stepper>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Pushing Configuration To Each Site</StepLabel>
            <StepContent>
                <p>
                  Pushing the generated configuration to each multi-site tool instance
                </p>
                <Stepper activeStep={0} orientation="vertical">
                  {siteCards}
                </Stepper>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Finished</StepLabel>
            <StepContent>
              <p>
                We recommend checking that all fabric instances have received the correct
                configuration.
              </p>
            </StepContent>
          </Step>
        </Stepper>
      </ConfigSection>
    )
  }

}

export default Syncer
