import React from 'react'

import Avatar from 'material-ui/lib/avatar'
import IconButton from 'material-ui/lib/icon-button'
import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import CardTitle from 'material-ui/lib/card/card-title'

import List from 'material-ui/lib/lists/list'
import Divider from 'material-ui/lib/divider'
import ListItem from 'material-ui/lib/lists/list-item'

import Public from 'material-ui/lib/svg-icons/social/public'
import NearMe from 'material-ui/lib/svg-icons/maps/near-me'
import Done from 'material-ui/lib/svg-icons/action/done'
import Add from 'material-ui/lib/svg-icons/content/add'
import CloudUpload from 'material-ui/lib/svg-icons/file/cloud-upload'
import Colors from 'material-ui/lib/styles/colors'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as intersiterCreators from '../redux/intersiter'

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

@connect((state) => ({}), (dispatch) => bindActionCreators(intersiterCreators, dispatch))
class Scope extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <List subheader="Intersiter">
        <ListItem primaryText="Global Configuration" leftAvatar={ <Avatar icon={ <Public/> } /> } onClick={ this.props.setGlobalConfig } />
        <ListItem primaryText="Site-local Configuration" leftAvatar={ <Avatar icon={ <NearMe/> } /> } onClick={ this.props.setLocalConfig } />
      </List>
    )
  }

}


class Sites extends React.Component {

  render() {
    return (
      <List subheader="Sites">
        <ListItem primaryText="SITE-A" secondaryText="172.31.186.1" leftAvatar={ <Avatar icon={ <Done /> } backgroundColor={ Colors.green500 } /> } />
        <ListItem primaryText="SITE-B" secondaryText="172.31.187.1" leftAvatar={ <Avatar icon={ <Done /> } backgroundColor={ Colors.green500 } /> } />
        <ListItem primaryText="SITE-C" secondaryText="172.31.188.1" leftAvatar={ <Avatar icon={ <Done /> } backgroundColor={ Colors.green500 } /> } />
        <AddSite />
      </List>
    )
  }

}

class AddSite extends React.Component {

  render() {
    return (
      <ListItem primaryText="Add Site" secondaryText="Click + to add a site" leftAvatar={ <Avatar icon={ <Add /> } /> } />
    )
  }

}

class SaveConfigButton extends React.Component {

  render() {
    return (
      <List>
        <ListItem primaryText="Save Confguration" secondaryText="Click to save and push configuration" leftAvatar={ <Avatar icon={ <CloudUpload /> } /> } />
      </List>
    )
  }

}
