import React from 'react'

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

@connect(({intersiter}) => ({}), (dispatch) => bindActionCreators(intersiterCreators, dispatch))
class Scope extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <List>
        <Subheader>Intersiter</Subheader>
        <ListItem primaryText="Global Configuration" leftAvatar={ <Avatar icon={ <Public/> } /> } onClick={ this.props.setGlobalConfig } />
        <ListItem primaryText="Site-local Configuration" leftAvatar={ <Avatar icon={ <NearMe/> } /> } onClick={ this.props.setLocalConfig } />
      </List>
    )
  }

}


@connect(({sites}) => ({sites}), (dispatch) => bindActionCreators(intersiterCreators, dispatch))
class Sites extends React.Component {

  render() {
    return (
      <List>
        <Subheader>Sites</Subheader>
        <ListItem primaryText="SITE-A" secondaryText="172.31.186.1" leftAvatar={ <Avatar icon={ <Done /> } backgroundColor={ green500 } /> } />
        <ListItem primaryText="SITE-B" secondaryText="172.31.187.1" leftAvatar={ <Avatar icon={ <Done /> } backgroundColor={ green500 } /> } />
        <ListItem primaryText="SITE-C" secondaryText="172.31.188.1" leftAvatar={ <Avatar icon={ <Done /> } backgroundColor={ green500 } /> } />
        {Object.keys(this.props.sites).map((k) => {
           var site = this.props.sites[k]
           return (<ListItem key={k} primaryText={site.name}
                     secondaryText={site.address ? site.address : "Enter address"}
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

  render() {
    return (
      <List>
        <ListItem primaryText="Sync Confguration" secondaryText="Click to save and push configuration" leftAvatar={ <Avatar icon={ <CloudUpload /> } /> } />
      </List>
    )
  }

}
