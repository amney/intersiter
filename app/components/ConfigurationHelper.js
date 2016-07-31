/*
  ConfigurationHelper
*/

import React from 'react'
import helpers from '../helpers'

import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem} from 'material-ui/List'
import {Card, CardTitle, CardText, CardHeader, CardExpandable} from 'material-ui/Card'
import {grey400, green500, red500, lightBlue700, amberA700} from 'material-ui/styles/colors'


class ConfigurationHelper extends React.Component {

  constructor(){
    super()
    this.state = {
      showMore: false,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.configStack.length > 0 && this.state.configStage == 0) {
      this.setState({
        configStage: 0,
        apiError: null,
        faults: [],
      })
      var timers = this.state.timers
      timers.push(setTimeout(this.getRollbackSnapshot, 10))
      this.setState({
        timers
      })
    }
  }

  render(){

    let standardActions = [
      <FlatButton label='Instant Rollback' onTouchTap={ this.instantRollback } />
      ,
      <FlatButton label='Done' onTouchTap={ this.finishedConfiguration } keyboardFocused={ true }
      primary={ true } />
    ]


    var showMoreIcon = (
    <IconButton iconClassName="material-icons" tooltipPosition="bottom-left" tooltip="Show object dn and data playload"
    onClick={ this.showMore }>
      more_vertical
    </IconButton>
    )


    var stage1 = (
    <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                          hourglass_empty</FontIcon> } backgroundColor={ grey400 } /> } rightIconButton={ showMoreIcon }>
      Configuration is being sent over
      <div style={ {  marginTop: 20} }>
        <LinearProgress mode="indeterminate" />
      </div>
      { this.state.showMore ? this.renderShowMore() : null }
    </ListItem>
    )

    var stage1_success = (
    <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                          check</FontIcon> } backgroundColor={ green500 } /> } rightIconButton={ showMoreIcon }>
      Configuration pushed
      { this.state.showMore ? this.renderShowMore() : null }
    </ListItem>
    )

    var stage2 = (
    <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                          hourglass_empty</FontIcon> } backgroundColor={ grey400 } /> }>
      Waiting 3 seconds for feedback on how that went
      <div style={ {  marginTop: 20} }>
        <LinearProgress mode="determinate" value={ 100 - (this.state.verifyCountdown / 30 * 100) } />
      </div>
    </ListItem>
    )


    var stage2_success = (
    <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                          check</FontIcon> } backgroundColor={ green500 } /> }>
      Gathered feedback from Fabric
    </ListItem>
    )


    var api_error = (
    <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                          error</FontIcon> } backgroundColor={ red500 } /> } secondaryText="Your ACI Fabric responded with the above error message."
    rightIconButton={ showMoreIcon }>
      { this.state.apiError }
      { this.state.showMore ? this.renderShowMore() : null }
    </ListItem>
    )

    var rollback = (
    <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                          fast_rewind</FontIcon> } backgroundColor={ lightBlue700 } /> } primaryText="Phew! Don't worry, I've got your back"
    secondaryText="Config rolled back" />
    )

    if(this.state.faults.length > 0) {
      var faultArray = this.state.faults.map(fault => <ListItem style={ {  fontSize: '0.75em'} } key={ fault.attributes.dn } leftAvatar={ <Avatar backgroundColor={ red500 } icon={ <FontIcon className="material-icons"> error</FontIcon> } /> }>
                                                        { fault.attributes.descr }
                                                      </ListItem>)
      var stage3 = (
      <div>
        <ListItem initiallyOpen={ true } primaryTogglesNestedList={ true }
        nestedItems={ faultArray } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                                 warning</FontIcon> } backgroundColor={ amberA700 } /> }>Uh Oh! There is a couple of new faults
        </ListItem>
      </div>
      )
    } else {
      var stage3 = (
      <div>
        <ListItem disabled={ true } leftAvatar={ <Avatar icon={ <FontIcon className="material-icons">
                                                                  check</FontIcon> } backgroundColor={ green500 } /> }>Looks Good! No new faults raised
        </ListItem>
      </div>
      )

    }

    var full = <Dialog title="Pushing to your Fabric" actions={ this.state.configStage >= 2 || this.state.configStage <= -1 ? standardActions : [] } open={ this.props.configStack.length > 0 }
               onRequestClose={ this.finishedConfiguration }>
                 <List>
                   { this.state.configStage == -2 ? rollback : <div /> }
                   { this.state.configStage == -1 ? api_error : <div /> }
                   { this.state.configStage == 1 ? stage1 : this.state.configStage > 1 ? stage1_success : <div /> }
                   { this.state.configStage == 2 ? stage2 : this.state.configStage > 2 ? stage2_success : <div /> }
                   { this.state.configStage >= 3 ? stage3 : <div /> }
                 </List>
               </Dialog>

    var mini = <div>
                 <Snackbar message={ `Pushing that to your Fabric` } action="Instant Undo" autoHideDuration={ 3000 }
                 onActionTouchTap={ this.instantRollback } open={ this.state.sbOpen } onRequestClose={ this.finishedConfigurationSB }
                 />
               </div>

    return <div>
             { this.props.mini ? mini : full }
           </div>
  }
}

export default ConfigurationHelper
