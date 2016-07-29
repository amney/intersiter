import React from 'react'
import autobind from 'autobind-decorator'
import ConfigSection from './ConfigSection'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'

import WarningIcon from 'material-ui/svg-icons/alert/warning'
import {red500} from 'material-ui/styles/colors'


@connect(({sync, sites, connections}) => ({sync, sites, connections}), (dispatch) => bindActionCreators({}, dispatch))
class Syncer extends React.Component {

  render() {
    const siteCards = this.props.sync.sites.map((k) => {
                var site = this.props.sites[k]
                var connection = this.props.connections[k]
                var error = false
                if(this.props.sync.error){
                  if(this.props.sync.siteId == k){
                    return (<Step key={k}>
                      <StepLabel
                        icon={<WarningIcon color={red500} />}
                        style={{color: red500}} >
                        {site.name} failed
                      </StepLabel>
                      <StepContent transitionDuration={0}>
                        <p>
                          {connection.address}
                          <br />
                          <br />
                          <strong>{this.props.sync.message}</strong>
                        </p>
                      </StepContent>
                    </Step>)
                  }
                }
                return (<Step key={k}>
                  <StepLabel>{site.name} {error ? "Failed!" : null} </StepLabel>
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
              <Stepper activeStep={this.props.sync.siteIndex} orientation="vertical">
                {siteCards}
              </Stepper>
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
                <Stepper activeStep={this.props.sync.siteIndex} orientation="vertical">
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
