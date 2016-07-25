import React from 'react'
import autobind from 'autobind-decorator'
import { push } from 'react-router-redux'

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
import CloudOff from 'material-ui/svg-icons/file/cloud-off'
import {green500, grey400} from 'material-ui/styles/colors'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as intersiterCreators from '../redux/intersiter'
import * as sitesCreators from '../redux/sites'
import {setSite} from '../redux/intersiter'
import {refreshSite} from '../redux/sites'
import {configIntersiters} from '../redux/sync'

import {lightBlueA700} from 'material-ui/styles/colors'

import Site from './Site'


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

@connect(({intersiter}) => ({site: intersiter.site}), (dispatch) => bindActionCreators({intersiterCreators, push}, dispatch))
class Scope extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <List>
        <Subheader>Intersiter</Subheader>
        <ListItem primaryText="Global Configuration" leftAvatar={ <Avatar icon={ <Public/> } /> } onClick={ () => this.props.push('') } />
      </List>
    )
  }

}


@connect(({sites, connections}) => ({sites, connections}), (dispatch) => bindActionCreators({setSite, refreshSite, push}, dispatch))
class Sites extends React.Component {

  @autobind
  setSite(id){
    this.props.setSite(id)
    this.props.push('/site')
  }

  render() {
    return (
      <List>
        <Subheader>Sites</Subheader>
        {Object.keys(this.props.sites).map((k) => {
           var site = this.props.sites[k]
           var connection = this.props.connections[k]
           return (<Site key={k} site={k} name={site.name} reachable={site.reachable} connection={connection} setSite={this.setSite} refreshSite={this.props.refreshSite} />)
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

@connect(({sync, sites}) => ({sync, sites}), (dispatch) => bindActionCreators({configIntersiters, push}, dispatch))
class SaveConfigButton extends React.Component {

  @autobind
  sync(){
    console.log('Syncing config')
    this.props.configIntersiters()
    this.props.push('sync')
  }

  render() {

    const reducer = (reachable, key) => {
      const site = this.props.sites[key]
      return reachable && (site.reachable > 0)
    }
    const allReachable = Object.keys(this.props.sites).reduce(reducer, true)

    var icon = <CloudOff />
    var bg = grey400
    var text = "Cannot Sync Configuration"
    var subtitle = "Not all sites are currently reachable"

    if(allReachable){
      icon = <CloudUpload />
      bg = lightBlueA700
      text = "Sync Configuration"
      subtitle = "Click to save and push configuration"
    }


    return (
      <List>
        <ListItem onTouchTap={this.sync} primaryText={text}
          disabled={!allReachable}
          secondaryText={subtitle}
          leftAvatar={ <Avatar backgroundColor={bg} icon={ icon } /> }/>
      </List>
    )
  }

}
