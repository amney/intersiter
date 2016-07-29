import React from 'react'
import autobind from 'autobind-decorator'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {List, ListItem} from 'material-ui/List'

import {green500, orangeA200, red500} from 'material-ui/styles/colors'
import Avatar from 'material-ui/Avatar'
import Done from 'material-ui/svg-icons/action/done'
import Sync from 'material-ui/svg-icons/notification/sync'
import SyncProblem from 'material-ui/svg-icons/notification/sync-problem'


class Site extends React.Component {

  componentDidMount(){
    //this.props.refreshSite(this.props.site)
  }

  render() {


    var icon = <Done />
    var colour = green500
    switch(this.props.reachable){
      case 0 || 2:
        icon = (<Sync />)
        colour = orangeA200
        break
      case 1:
        icon = (<Done />)
        colour = green500
        break
      default:
        icon = (<SyncProblem />)
        colour = red500
    }

    return (
      <ListItem
        primaryText={this.props.name}
        secondaryText={this.props.connection.address || "Please specify an address"}
        leftAvatar={ <Avatar icon={ icon }
        backgroundColor={ colour } /> }
        onClick={this.props.setSite.bind(this, this.props.site)} />
    )
  }

}

export default Site
