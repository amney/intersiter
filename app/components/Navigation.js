import React from 'react'
import autobind from 'autobind-decorator'

import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import {Card, CardText, CardHeader} from 'material-ui/Card'

import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

import Public from 'material-ui/svg-icons/social/public'
import NearMe from 'material-ui/svg-icons/maps/near-me'
import Done from 'material-ui/svg-icons/action/done'
import Add from 'material-ui/svg-icons/content/add'
import CloudUpload from 'material-ui/svg-icons/file/cloud-upload'
import {green500} from 'material-ui/styles/colors'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as intersiterCreators from '../redux/intersiter'
import * as sitesCreators from '../redux/sites'


class Navigation extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Card>
        <CardText>
          <Scope/>
          <Divider />
          <Sites />
          <Divider />
          <SaveConfigButton />
        </CardText>
      </Card>
    )
  }

}

export default Navigation

@connect(({intersiter}) => ({site: intersiter.site}), (dispatch) => bindActionCreators(intersiterCreators, dispatch))
class Scope extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <List>
        <Subheader>Intersiter</Subheader>
        <ListItem primaryText="Global Configuration" leftAvatar={ <Avatar icon={ <Public/> } /> } onClick={ this.props.setGlobalConfig } />
      </List>
    )
  }

}


@connect(({sites, connections}) => ({sites, connections}), (dispatch) => bindActionCreators(intersiterCreators, dispatch))
class Sites extends React.Component {

  render() {
    return (
      <List>
        <Subheader>Sites</Subheader>
        {Object.keys(this.props.sites).map((k) => {
           var site = this.props.sites[k]
           var connection = this.props.connections[k]
           return (<ListItem key={k} primaryText={site.name}
                     secondaryText={connection.address}
                     leftAvatar={ <Avatar icon={ <Done /> }
                     backgroundColor={ green500 } /> }
                     onClick={this.props.setSite.bind(this, k)} />)
         })}
        <AddSite />
      </List>
    )
  }

}

@connect(({sites}) => ({}), (dispatch) => bindActionCreators(sitesCreators, dispatch))
class AddSite extends React.Component {

  render() {
    return (
      <ListItem primaryText="Add Site" secondaryText="Click + to add a site" leftAvatar={ <Avatar icon={ <Add /> }/> }  onClick={this.props.addSite}/>
    )
  }

}

class SaveConfigButton extends React.Component {

  sync(){
    console.log('Syncing config')
  }

  render() {
    return (
      <List>
        <ListItem primaryText="Sync Confguration" secondaryText="Click to save and push configuration" leftAvatar={ <Avatar icon={ <CloudUpload /> } /> } onTouchTap={this.sync}/>
      </List>
    )
  }

}
