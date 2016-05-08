import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import AutoComplete from 'material-ui/AutoComplete'
import {row} from 'flexboxgrid'
import {epgBox} from './style.css'

class EPGSelector extends React.Component {
  render() {
    return (
      <div className={row}>
        <div className={epgBox}>
          <List>
            <Subheader>Available EPGs</Subheader>
            <ListItem primaryText="EPG1" secondaryText="Tenant A - App B" rightIcon={ <ChevronRight /> } />
            <ListItem primaryText="EPG2" secondaryText="Tenant A - App B" rightIcon={ <ChevronRight /> } />
            <ListItem primaryText="EPG3" secondaryText="Tenant A - App B" rightIcon={ <ChevronRight /> } />
          </List>
          <AutoComplete style={ {  marginLeft: 7,  width: '100%'} } hintText="Search for EPG" filter={ AutoComplete.noFilter } dataSource={ ['EPGA', 'EPGB'] } />
        </div>
        <div className={epgBox}>
          <List>
            <Subheader>Seleted EPGs</Subheader>
            <ListItem primaryText="EPG4" secondaryText="Tenant A - App B" leftIcon={ <ChevronLeft /> } />
          </List>
        </div>
      </div>
      )
  }
}

export default EPGSelector
